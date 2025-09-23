import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error' | 'reconnecting'

type WsMessage = {
  id: string
  type: 'sent' | 'received'
  data: any
  timestamp: Date
  raw?: string
}

type WsOptions = {
  onOpen?: (ev: Event) => void
  onMessage?: (ev: MessageEvent) => void
  onClose?: (ev: CloseEvent) => void
  onError?: (ev: Event | Error) => void
  autoReconnect?: boolean
  reconnectDelay?: number
}

interface WsStore {
  // Connection state
  ws: WebSocket | null
  url: string | null
  status: ConnectionStatus
  error: string | null
  
  // Messages
  messages: WsMessage[]
  
  // Connection options
  options: WsOptions
  
  // Reconnection state
  reconnectAttempts: number
  maxReconnectAttempts: number
  reconnectTimeoutId: number | null
  
  // Editor draft (persist editor content globally)
  draftMessage: string
  
  // Computed getters
  isConnected: boolean
  isConnecting: boolean
  isReconnecting: boolean
  
  // Actions
  connect: (url: string, options?: WsOptions) => void
  disconnect: (code?: number, reason?: string) => void
  send: (data: string | object) => boolean
  clearMessages: () => void
  setError: (error: string | null) => void
  setDraftMessage: (message: string) => void
  
  // Internal actions
  setStatus: (status: ConnectionStatus) => void
  addMessage: (message: Omit<WsMessage, 'id' | 'timestamp'>) => void
  handleReconnect: () => void
  getReadyState: () => number
}

// SSR-safe initial state
const getInitialState = () => ({
  ws: null,
  url: null,
  status: 'disconnected' as ConnectionStatus,
  error: null,
  messages: [],
  isConnected: false,
  draftMessage: '',
  options: {},
  reconnectAttempts: 0,
  maxReconnectAttempts: 5,
  reconnectTimeoutId: null,
})

// Create the store with computed values
export const useWsStore = create<WsStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    ...getInitialState(),

    // Computed getters
    get isConnected() {
      return get().status === 'connected'
    },
    
    get isConnecting() {
      return get().status === 'connecting'
    },
    
    get isReconnecting() {
      return get().status === 'reconnecting'
    },

    // Connect action
    connect: (url: string, options: WsOptions = {}) => {
      const state = get()
      
      // Close existing connection
      if (state.ws) {
        state.ws.close()
      }
      
      // Clear existing timeout
      if (state.reconnectTimeoutId) {
        clearTimeout(state.reconnectTimeoutId)
      }

      set({
        url,
        options,
        status: 'connecting',
        isConnected: false,
        error: null,
        reconnectAttempts: 0
      })

      try {
        const ws = new WebSocket(url)

        ws.onopen = (event) => {
          console.log('WebSocket connected to:', url)
          set({ 
            ws, 
            status: 'connected', 
            error: null,
            isConnected: true,
            reconnectAttempts: 0 
          })
          options.onOpen?.(event)
        }

        ws.onmessage = (event) => {
          console.log('WebSocket message received:', event.data)
          
          // Add to message history
          get().addMessage({
            type: 'received',
            data: event.data,
            raw: event.data
          })
          
          options.onMessage?.(event)
        }

        ws.onclose = (event) => {
          console.log('WebSocket closed:', event.code, event.reason)
          
          set({ ws: null })
          options.onClose?.(event)

          // Handle reconnection
          if (options.autoReconnect && event.code !== 1000) {
            get().handleReconnect()
          } else {
            set({ status: 'disconnected' })
          }
        }

        ws.onerror = (event) => {
          console.error('WebSocket error:', event)
          set({ 
            status: 'error', 
            error: 'Connection error occurred' 
          })
          options.onError?.(event)
        }

      } catch (error) {
        console.error('Failed to create WebSocket:', error)
        set({ 
          status: 'error', 
          error: error instanceof Error ? error.message : 'Failed to create WebSocket' 
        })
        options.onError?.(error as Error)
      }
    },

    // Disconnect action
    disconnect: (code = 1000, reason = '') => {
      const state = get()
      
      if (state.reconnectTimeoutId) {
        clearTimeout(state.reconnectTimeoutId)
      }
      
      if (state.ws) {
        state.ws.close(code, reason)
      }
      
      set({
        ws: null,
        status: 'disconnected',
        isConnected: false,
        reconnectTimeoutId: null,
        reconnectAttempts: 0
      })
    },

    // Send message action
    send: (data: string | object) => {
      const state = get()
      
      if (!state.ws || state.ws.readyState !== WebSocket.OPEN) {
        console.warn('WebSocket is not connected')
        return false
      }

      try {
        const message = typeof data === 'string' ? data : JSON.stringify(data)
        state.ws.send(message)
        
        // Add to message history
        get().addMessage({
          type: 'sent',
          data,
          raw: message
        })
        
        console.log('WebSocket message sent:', message)
        return true
      } catch (error) {
        console.error('Failed to send message:', error)
        set({ error: 'Failed to send message' })
        return false
      }
    },

    // Clear messages
    clearMessages: () => set({ messages: [] }),
    
    // Draft message (editor)
    setDraftMessage: (message: string) => set({ draftMessage: message }),

    // Set error
    setError: (error: string | null) => set({ error }),

    // Set status (internal)
    setStatus: (status: ConnectionStatus) => set({ status }),

    // Add message (internal)
    addMessage: (message: Omit<WsMessage, 'id' | 'timestamp'>) => {
      const newMessage: WsMessage = {
        ...message,
        id: crypto.randomUUID(),
        timestamp: new Date()
      }
      
      set(state => ({
        messages: [...state.messages, newMessage].slice(-100) // Keep last 100 messages
      }))
    },

    // Handle reconnection (internal)
    handleReconnect: () => {
      const state = get()
      
      if (state.reconnectAttempts >= state.maxReconnectAttempts) {
        console.log('Max reconnection attempts reached')
        set({ 
          status: 'error', 
          error: 'Max reconnection attempts reached' 
        })
        return
      }

      const delay = (state.options.reconnectDelay || 3000) * Math.pow(1.5, state.reconnectAttempts)
      
      set({ 
        status: 'reconnecting',
        reconnectAttempts: state.reconnectAttempts + 1
      })
      
      console.log(`Reconnecting in ${delay}ms (attempt ${state.reconnectAttempts + 1}/${state.maxReconnectAttempts})`)
      
      const timeoutId = window.setTimeout(() => {
        if (state.url) {
          get().connect(state.url, state.options)
        }
      }, delay)
      
      set({ reconnectTimeoutId: timeoutId })
    },

    // Get WebSocket ready state
    getReadyState: () => {
      const ws = get().ws
      return ws ? ws.readyState : WebSocket.CLOSED
    }
  }))
)