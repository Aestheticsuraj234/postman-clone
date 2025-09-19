import { Archive, Upload } from 'lucide-react'
import React from 'react'

const EmptyCollections = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8">  
            <>
              <div className="mb-6">
                <div className="w-24 h-24 border-2 border-zinc-700 rounded-lg flex items-center justify-center">
                  <Archive className="w-12 h-12 text-zinc-600" />
                </div>
              </div>
              <h3 className="text-zinc-400 text-sm mb-2">Collections are empty</h3>
              <p className="text-zinc-500 text-xs mb-8 text-center">
                Import or create a collection
              </p>
              <div className="space-y-3 w-full max-w-xs">
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-lg font-medium text-sm transition-colors flex items-center justify-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>
              
              </div>
</>
            </div>
  )
}

export default EmptyCollections