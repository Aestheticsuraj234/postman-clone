import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlugZap, Plug, AlertCircle } from 'lucide-react'
import React, { useState, useCallback, useEffect } from 'react'
import { useWsStore } from '../hooks/useWs'

const RealtimeConnectionBar = () => {
  const { 
    status, 
    isConnected, 
    error, 
    url: connectedUrl, 
    reconnectAttempts, 
    maxReconnectAttempts,
    connect,
    disconnect
  } = useWsStore()
  
  const [url, setUrl] = useState(connectedUrl || '')

  // keep local input in sync with connectedUrl
  useEffect(() => {
    setUrl(connectedUrl || '')
  }, [connectedUrl])

  const onConnect = useCallback(() => {
    if (!url.trim()) {
      alert('Please enter a WebSocket URL')
      return
    }

    if (isConnected) {
      // Disconnect if already connected
      disconnect()
    } else {
      // Connect to WebSocket
      connect(url, {
        onOpen: (event) => {
          console.log('Successfully connected to:', url)
        },
        onClose: (event) => {
          console.log('Disconnected from WebSocket')
        },
        onError: (error) => {
          console.error('WebSocket connection error:', error)
        },
        onMessage: (event) => {
          console.log('Received message:', event.data)
        },
        autoReconnect: true,
        reconnectDelay: 3000
      })
    }
  }, [url, isConnected, connect, disconnect])

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onConnect()
    }
  }, [onConnect])

  const getConnectionColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-500 hover:bg-green-600'
      case 'connecting':
      case 'reconnecting':
        return 'bg-yellow-500 hover:bg-yellow-600'
      case 'error':
        return 'bg-red-500 hover:bg-red-600'
      default:
        return 'bg-zinc-700 hover:bg-zinc-600'
    }
  }

  const getConnectionIcon = () => {
    switch (status) {
      case 'connected':
        return <Plug size={20} />
      case 'connecting':
      case 'reconnecting':
        return <PlugZap size={20} className="animate-pulse" />
      case 'error':
        return <AlertCircle size={20} />
      default:
        return <PlugZap size={20} />
    }
  }

  const getButtonText = () => {
    switch (status) {
      case 'connected':
        return 'Disconnect'
      case 'connecting':
        return 'Connecting...'
      case 'reconnecting':
        return `Reconnecting... (${reconnectAttempts}/${maxReconnectAttempts})`
      case 'error':
        return 'Retry'
      default:
        return 'Connect'
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'reconnecting':
        return `reconnecting (${reconnectAttempts}/${maxReconnectAttempts})`
      default:
        return status
    }
  }

  return (
    <div className='flex flex-row items-center justify-between bg-zinc-900 rounded-md px-2 py-2 w-full'>
      <div className="flex flex-row items-center gap-2 flex-1">
        <Input 
          value={url} 
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter WebSocket URL (e.g., ws://localhost:8080)"
          className="flex-1 bg-zinc-800 border-zinc-700 text-white placeholder-zinc-400"
          disabled={status === 'connecting' || status === 'reconnecting'}
        />
      </div>
      
      <div className="flex items-center gap-2 ">
        {/* Connection Status Indicator */}
        <div className="flex px-2 flex-col items-end text-xs text-zinc-400">
          <div className="flex items-center gap-1">
            <div 
              className={`w-2 h-2 rounded-full ${
                status === 'connected' ? 'bg-green-500' :
                status === 'connecting' || status === 'reconnecting' ? 'bg-yellow-500 animate-pulse' :
                status === 'error' ? 'bg-red-500' : 'bg-zinc-500'
              }`}
            />
            <span className="capitalize">{getStatusText()}</span>
          </div>
          {connectedUrl && (
            <div className="text-[10px] text-zinc-500 max-w-32 truncate">
              {connectedUrl}
            </div>
          )}
          {error && (
            <div className="text-[10px] text-red-400 max-w-32 truncate">
              {error}
            </div>
          )}
        </div>
        
        <Button
          type='button'
          onClick={onConnect}
          disabled={status === 'connecting' || status === 'reconnecting'}
          className={`ml-2 text-white font-bold transition-colors ${getConnectionColor()}`}
        >
          <span className="flex items-center gap-2">
            {getConnectionIcon()}
            {getButtonText()}
          </span>
        </Button>
      </div>
    </div>
  )
}

export default RealtimeConnectionBar
