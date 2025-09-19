import { EllipsisVertical, FilePlus, Folder, Trash, Edit } from 'lucide-react';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditCollectionModal from './edit-collection';
import DeleteCollectionModal from './delete-collection';


interface Props {
  collection: {
    id: string;
    name: string;
    updatedAt: Date;
    workspaceId: string;
  }
}

const CollectionFolder = ({ collection }: Props) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <div className='flex flex-row justify-between items-center p-2 flex-1 w-full hover:bg-zinc-900 rounded-md'>
        <div className='flex flex-row justify-start items-center space-x-2'>
          <Folder className='w-5 h-5 text-zinc-400' />
          <span className='text-sm font-medium text-zinc-200 capitalize'>{collection.name}</span>
        </div>

        <div className='flex flex-row justify-center items-center space-x-2'>
          <FilePlus className='w-4 h-4 text-zinc-400 hover:text-indigo-400 cursor-pointer' />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='p-1 hover:bg-zinc-800 rounded'>
                <EllipsisVertical className='w-4 h-4 text-zinc-400 hover:text-indigo-400' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                <div className='flex flex-row justify-between items-center w-full'>
                  <div className='font-semibold flex justify-center items-center'>
                    <Edit className='text-blue-400 mr-2 w-4 h-4' />
                    Edit
                  </div>
                  <span className='text-xs text-zinc-400 bg-zinc-700 px-1 rounded'>⌘E</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteOpen(true)}>
                <div className='flex flex-row justify-between items-center w-full'>
                  <div className='font-semibold flex justify-center items-center'>
                    <Trash className='text-red-400 mr-2 w-4 h-4' />
                    Delete
                  </div>
                  <span className='text-xs text-zinc-400 bg-zinc-700 px-1 rounded'>⌘D</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Modals */}
      <EditCollectionModal
        isModalOpen={isEditOpen}
        setIsModalOpen={setIsEditOpen}
        collectionId={collection.id}
        initialName={collection.name}
      />

      <DeleteCollectionModal
        isModalOpen={isDeleteOpen}
        setIsModalOpen={setIsDeleteOpen}
        collectionId={collection.id}
      />
    </>
  );
};

export default CollectionFolder;
