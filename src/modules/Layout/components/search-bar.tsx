"use client"
import { Search } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const SearchBar = () => {
  const [open, setOpen] = useState(false)

  // Handle keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      {/* Search Button */}
      <button 
        onClick={() => setOpen(true)}
        className="relative flex flex-1 cursor-text items-center justify-between self-stretch rounded bg-zinc-900 px-4 py-2 text-gray-500 transition hover:bg-zinc-800 hover:text-gray-200 focus-visible:bg-zinc-700 focus-visible:text-gray-200 overflow-hidden"
      >
        <span className="inline-flex flex-1 items-center">
          <Search size={16} className="mr-2" />
          <span className="text-xs text-left">Search</span>
        </span>
        <span className="flex space-x-1">
          <kbd className="px-1 py-0.5 text-xs bg-zinc-700 rounded">Ctrl</kbd>
          <kbd className="px-1 py-0.5 text-xs bg-zinc-700 rounded">K</kbd>
        </span>
      </button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bg-zinc-900 border border-zinc-800">
          <CommandInput 
            placeholder="Type a command or search..." 
            className="bg-transparent border-none text-gray-300 placeholder:text-gray-500"
          />
          <CommandList className="bg-zinc-900">
            <CommandEmpty className="text-gray-500 py-6 text-center">No results found.</CommandEmpty>
            <CommandGroup>
              <CommandItem onSelect={() => setOpen(false)} className="text-gray-300 hover:bg-zinc-800">
                <span>Pre-request Script</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)} className="text-gray-300 hover:bg-zinc-800">
                <span>Tests</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)} className="text-gray-300 hover:bg-zinc-800">
                <span>Variables</span>
              </CommandItem>
              <CommandItem onSelect={() => setOpen(false)} className="text-gray-300 hover:bg-zinc-800">
                <span>Documentation</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
          
          {/* Bottom navigation hints */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-zinc-800 bg-zinc-900">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 text-gray-400 rounded text-xs">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-zinc-800 text-gray-400 rounded text-xs">↓</kbd>
                <span>to navigate</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 text-gray-400 rounded text-xs">↵</kbd>
                <span>to select</span>
              </div>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <kbd className="px-1.5 py-0.5 bg-zinc-800 text-gray-400 rounded text-xs">ESC</kbd>
              <span>to close</span>
            </div>
          </div>
        </div>
      </CommandDialog>
    </>
  )
}

export default SearchBar