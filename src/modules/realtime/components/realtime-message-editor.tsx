import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Send, Copy, Trash2, RefreshCw } from 'lucide-react'
import { useWsStore } from '../hooks/useWs'
import Editor from '@monaco-editor/react'
import { toast } from 'sonner'
import RealtimeClientServerLogsTable from './realtime-client-server-logs-table'

const RealtimeMessageEditor = () => {
  const { 
    send, 
    status,
    isConnected, 
    draftMessage, 
    setDraftMessage, 
    messages 
  } = useWsStore()
  
  const [isSending, setIsSending] = useState(false)
  const [lastSent, setLastSent] = useState('')
  const editorRef = useRef(null)
  const monacoRef = useRef(null)

  useEffect(() => {
    if (!draftMessage) {
      const initial = '{\n  "type": "message",\n  "content": "Hello WebSocket!",\n  "timestamp": "' + new Date().toISOString() + '"\n}'
      setDraftMessage(initial)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSendMessage = useCallback(async () => {
    if (!status || status !== 'connected') {
      toast.info('WebSocket is not connected!')
      return
    }

    if (!draftMessage || !draftMessage.trim()) {
      toast.info('Please enter a message!')
      return
    }

    try {
      setIsSending(true)
      
      // Try to parse JSON to validate
      let messageToSend
      try {
        messageToSend = JSON.parse(draftMessage)

      } catch (e) {
        // If not valid JSON, send as string
        messageToSend = draftMessage
      }

      const success = send(messageToSend)
      if (success) {
        setLastSent(draftMessage)
        toast.success('Message sent successfully')
      } else {
        toast.error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Error sending message: ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setIsSending(false)
    }
  }, [draftMessage, send, isConnected])

  // Initialize Monaco Editor
  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    editorRef.current = editor
    monacoRef.current = monaco


    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: false,
      schemas: [],
      enableSchemaRequest: true
    })

    // Set editor options
    editor.updateOptions({
      theme: 'vs-dark',
      fontSize: 14,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      formatOnPaste: true,
      formatOnType: true
    })

    // Add keyboard shortcut for sending (Ctrl+Enter)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleSendMessage()
    })
  }, [handleSendMessage])

  const handleFormatJSON = useCallback(() => {
    try {
      const parsed = JSON.parse(draftMessage)
      const formatted = JSON.stringify(parsed, null, 2)
      setDraftMessage(formatted)
      if (editorRef.current) {
        // @ts-ignore
        editorRef.current.setValue(formatted)
      }
    } catch (error) {
      alert('Invalid JSON format')
    }
  }, [draftMessage, setDraftMessage])

  const handleCopyMessage = useCallback(() => {
    navigator.clipboard.writeText(draftMessage)
      .then(() => {
        console.log('Message copied to clipboard')
      })
      .catch(err => {
        console.error('Failed to copy message:', err)
      })
  }, [draftMessage])

  const handleClearMessage = useCallback(() => {
    const emptyMessage = '{\n  \n}'
    setDraftMessage(emptyMessage)
    if (editorRef.current) {
      // @ts-ignore
      editorRef.current.setValue(emptyMessage)
      // @ts-ignore
      editorRef.current.focus()
    }
  }, [setDraftMessage])

  

  return (
    <div className="flex flex-col space-y-4 bg-zinc-800 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Message Editor</h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded ${
            status === 'connected' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {status === 'connected' ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

    
      {/* Editor */}
      <div className="relative">
        <div className="border border-zinc-700 rounded-lg overflow-hidden">
          {/* Monaco Editor */}
          <Editor
            height="150px"
            language="json"
            theme="vs-dark"
            value={draftMessage}
            onChange={(value) => setDraftMessage(value || '')}
            onMount={handleEditorDidMount}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              formatOnPaste: true,
              formatOnType: true,
              automaticLayout: true,
              tabSize: 2,
              insertSpaces: true,
              folding: true,
              lineNumbers: 'on',
              renderWhitespace: 'boundary',
              cursorStyle: 'line',
              contextmenu: true,
              mouseWheelZoom: false
            }}
            loading={
              <div className="w-full h-64 bg-zinc-900 flex items-center justify-center">
                <div className="text-zinc-400 text-sm">Loading Monaco Editor...</div>
              </div>
            }
          />
        </div>
        
        {/* Editor Actions */}
        <div className="absolute top-2 right-2 flex gap-1 opacity-70 hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            onClick={handleFormatJSON}
            className="h-6 w-6 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700"
          >
            <RefreshCw size={12} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopyMessage}
            className="h-6 w-6 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700"
          >
            <Copy size={12} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClearMessage}
            className="h-6 w-6 p-0 text-zinc-400 hover:text-white hover:bg-zinc-700"
          >
            <Trash2 size={12} />
          </Button>
        </div>
      </div>

      {/* Send Button and Info */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-zinc-400">
          Press Ctrl+Enter to send • JSON auto-validation enabled
        </div>
        <Button
          onClick={handleSendMessage}
          disabled={status !== 'connected' || isSending}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium"
        >
          <Send size={16} className="mr-2" />
          {isSending ? 'Sending...' : 'Send Message'}
        </Button>
      </div>

            <RealtimeClientServerLogsTable />
    </div>
  )
}

export default RealtimeMessageEditor