import { Button } from '@/components/ui/button';
import { Archive, Clock, Code, Share2, ExternalLink, HelpCircle, Plus, Search, Upload, Loader } from 'lucide-react';
import React, { useState } from 'react';
import CreateCollection from '../../collections/components/create-collection';
import { useCollections } from '@/modules/collections/hooks/collections';
import EmptyCollections from '../../collections/components/empty-collections';
import CollectionFolder from '@/modules/collections/components/collection-folder';


interface Props {
  currentWorkspace: any;
}

const TabbedSidebar = ({ currentWorkspace }: Props) => {
  const [activeTab, setActiveTab] = useState('Collections');
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const {data:collections , isLoading, isError} = useCollections(currentWorkspace?.id);

  
 
  if(isLoading) return (
    <div className="flex-1 flex items-center justify-center">
      <Loader className="w-6 h-6 text-indigo-400 animate-spin" />
    </div>
  )

  const sidebarItems = [
    { icon: Archive, label: 'Collections' },
    { icon: Clock, label: 'History' },
    { icon: Share2, label: 'Share' },
    { icon: Code, label: 'Code' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Collections':
        return (
          <div className="h-full bg-zinc-950 text-zinc-100 flex flex-col">
         
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-zinc-400">{currentWorkspace?.name}</span>
                <span className="text-zinc-600">›</span>
                <span className="text-sm font-medium">Collections</span>
              </div>
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-4 h-4 text-zinc-400 hover:text-zinc-300 cursor-pointer" />
                <ExternalLink className="w-4 h-4 text-zinc-400 hover:text-zinc-300 cursor-pointer" />
              </div>
            </div>
            

         
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

          
            <div className="p-4 border-b border-zinc-800">
              <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">New</span>
              </Button>
            </div>

          {
            collections && collections.length > 0 ? (
              collections.map((collection) => (
                <div className='flex flex-col justify-start items-start p-3 border-b border-zinc-800 w-full' key={collection.id}>
                <CollectionFolder  collection={collection} />
                </div>
              ))
            ) : (
              <EmptyCollections />
            )}
          </div>
        );

      default:
        return <div className="p-4 text-zinc-400">Select a tab to view content</div>;
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Sidebar */}
      <div className="w-12 bg-zinc-900 border-r border-zinc-800 flex flex-col items-center py-4 space-y-4">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(item.label)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
              activeTab === item.label
                ? 'bg-indigo-600 text-white'
                : 'text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <item.icon className="w-4 h-4" />
          </div>
        ))}
      </div>

      <div className="flex-1 bg-zinc-900 overflow-y-auto">{renderTabContent()}</div>

    
      <CreateCollection
        workspaceId={currentWorkspace?.id}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      
    </div>
  );
};

export default TabbedSidebar;
