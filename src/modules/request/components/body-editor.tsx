'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem
} from '@/components/ui/form'
import { RotateCcw, Copy, Check, Code, AlignLeft, FileText, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGenerateJsonBody } from '@/modules/ai/hooks/ai-suggestion'

import { useWorkspaceStore } from '@/modules/Layout/store'
import { useRequestPlaygroundStore } from '../store/useRequestStore'


const MonacoEditor = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false }
)

const bodyEditorSchema = z.object({
  contentType: z.enum(['application/json', 'text/plain']),
  body: z.string().optional(),
})

type BodyEditorFormData = z.infer<typeof bodyEditorSchema>

interface BodyEditorProps {
  initialData?: {
    contentType?: 'application/json' | 'text/plain'
    body?: string
  }
  onSubmit: (data: BodyEditorFormData) => void
  className?: string
}

const BodyEditor: React.FC<BodyEditorProps> = ({
  initialData = { contentType: 'application/json', body: '' },
  onSubmit,
  className
}) => {
  const [copied, setCopied] = useState(false)
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [prompt, setPrompt] = useState('')
  const {selectedWorkspace} = useWorkspaceStore()

  const {tabs, activeTabId} = useRequestPlaygroundStore();

  const {mutateAsync , data , isPending , isError} = useGenerateJsonBody()

  const form = useForm<BodyEditorFormData>({
    resolver: zodResolver(bodyEditorSchema),
    defaultValues: {
      contentType: initialData.contentType || 'application/json',
      body: initialData.body || ''
    },
  })

  const contentType = form.watch('contentType')
  const bodyValue = form.watch('body')

  // Handle editor value changes
  const handleEditorChange = (value?: string) => {
    form.setValue('body', value || '', { shouldValidate: true })
  }

  // Handle copy
  const handleCopy = async () => {
    if (bodyValue) {
      try {
        await navigator.clipboard.writeText(bodyValue)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  const handleGenerateClick = () => {
    setShowGenerateDialog(true);
  }

  const onGenerateBody = async (promptText: string) => {
    try {
     
    
      if (bodyValue) {
        try {
          JSON.parse(bodyValue);
        } catch (e) {
          
          console.log('Invalid existing JSON, generating new schema');
        }
      }

      const result = await mutateAsync({
        prompt: promptText,
        method: tabs.find(t => t.id === activeTabId)?.method || 'POST',
        endpoint: tabs.find(t => t.id === activeTabId)?.url || '/',
        context: `Generate a JSON body with the following requirements: ${promptText}`,
       
      });

      if (result?.jsonBody) {
        form.setValue('body', JSON.stringify(result.jsonBody, null, 2));
      }
      setShowGenerateDialog(false);
      setPrompt('');
    } catch (error) {
      console.error('Failed to generate JSON body:', error);
    }
  }


  const handleFormat = () => {
    if (contentType === 'application/json' && bodyValue) {
      try {
        const formatted = JSON.stringify(JSON.parse(bodyValue), null, 2)
        form.setValue('body', formatted)
      } catch (error) {
        console.error('Invalid JSON format')
      }
    }
  }

  // Reset
  const handleReset = () => {
    form.setValue('body', '')
  }

  const contentTypeOptions = [
    {
      value: 'application/json',
      label: 'application/json',
      icon: Code,
      description: 'JSON data format'
    },
    {
      value: 'text/plain',
      label: 'text/plain',
      icon: FileText,
      description: 'Plain text format'
    }
  ]

  return (
    <div className={cn("w-full", className)}>
      <Form {...form}>
        <div className="border border-zinc-700 rounded-lg overflow-hidden bg-zinc-900">
          {/* Header */}
          <div className="bg-zinc-900 border-b border-zinc-900 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-medium text-zinc-200">Raw Request Body</h3>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span>Content Type</span>
                <FormField
                  control={form.control}
                  name="contentType"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[180px] h-7 bg-zinc-700 border-zinc-600 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-zinc-800 border-zinc-600">
                          {contentTypeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-xs hover:bg-zinc-700 focus:bg-zinc-700"
                            >
                              <div className="flex items-center gap-2">
                                <option.icon className="h-3 w-3" />
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {contentType === 'application/json' && (
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleGenerateClick}
                  disabled={isPending}
                  className="h-7 px-2 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
                  title="Generate JSON Body"
                >
                  <Sparkles className={cn('h-3 w-3', isPending ? 'animate-spin text-zinc-400' : 'text-green-400')} />
                </Button>
              )}

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleFormat}
                  className="h-7 px-2 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
                  title="Format JSON"
                >
                  <AlignLeft className="h-3 w-3" />
                </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-7 px-2 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
                title="Copy content"
              >
                {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-7 px-2 text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700"
                title="Clear content"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Editor */}
          <div className="relative h-80">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MonacoEditor
                      height="320px"
                      value={field.value}
                      language={contentType === 'application/json' ? 'json' : 'plaintext'}
                      theme="vs-dark"
                      options={{
                        automaticLayout: true,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        fontSize: 18,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        padding: { top: 16, bottom: 16 },
                        scrollbar: {
                          vertical: 'visible',
                          horizontal: 'visible',
                          useShadows: false,
                        }
                      }}
                      onChange={handleEditorChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Footer */}
          <div className="bg-zinc-900 border-t border-zinc-700 px-4 py-3 flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              Lines: {bodyValue?.split('\n').length || 0} | 
              Characters: {bodyValue?.length || 0}
            </div>
            <Button
              type="button"
              size="sm"
              className="bg-indigo-400 hover:bg-indigo-500 text-white h-7"
              onClick={() => form.handleSubmit(onSubmit)()}
            >
              Update Body
            </Button>
          </div>
        </div>
      </Form>

      {/* Generate JSON Dialog */}
      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent className="sm:max-w-[425px] bg-zinc-900 text-zinc-100 border-zinc-800">
          <DialogHeader>
            <DialogTitle>Generate JSON Body</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="prompt">What kind of JSON body do you need?</Label>
              <Input
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                placeholder="e.g., Create a user registration body with email and password"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowGenerateDialog(false)}
              className="border-zinc-700 text-zinc-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => onGenerateBody(prompt)}
              disabled={!prompt.trim() || isPending}
              className="bg-indigo-500 hover:bg-indigo-600"
            >
              {isPending ? 'Generating...' : 'Generate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default BodyEditor
