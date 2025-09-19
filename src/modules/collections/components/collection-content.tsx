import { Archive, ExternalLink, HelpCircle, Plus, Search, Upload } from 'lucide-react'
import React from 'react'

const CollectionContent = () => {
  return (
     <div className="h-full bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-zinc-400">sample</span>
          <span className="text-zinc-600">›</span>
          <span className="text-sm font-medium">Collections</span>
        </div>
        <div className="flex items-center space-x-2">
          <HelpCircle className="w-4 h-4 text-zinc-400 hover:text-zinc-300 cursor-pointer" />
          <ExternalLink className="w-4 h-4 text-zinc-400 hover:text-zinc-300 cursor-pointer" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-zinc-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* New Button */}
      <div className="p-4 border-b border-zinc-800">
        <button className="flex items-center space-x-2 text-zinc-300 hover:text-white transition-colors">
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* Empty State Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 border-2 border-zinc-700 rounded-lg flex items-center justify-center">
            <Archive className="w-12 h-12 text-zinc-600" />
          </div>
        </div>

        {/* Empty State Text */}
        <h3 className="text-zinc-400 text-sm mb-2">Collections are empty</h3>
        <p className="text-zinc-500 text-xs mb-8 text-center">
          Import or create a collection
        </p>

        {/* Action Buttons */}
        <div className="space-y-3 w-full max-w-xs">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          
          <button className="w-full text-zinc-300 hover:text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2 hover:bg-zinc-800">
            <Plus className="w-4 h-4" />
            <span>Add new</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CollectionContent