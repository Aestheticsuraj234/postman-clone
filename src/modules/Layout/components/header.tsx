"use client"
import { Unplug, Search } from 'lucide-react'
import React from 'react'
import SearchBar from './search-bar'
import UserButton from '@/modules/authentication/components/user-button'

import InviteMember from './invite-member'
import WorkSpace from './workspace'
import { UserProps, WorkspaceProps } from '../types'


interface Props {
  user: UserProps
  workspace: WorkspaceProps
}

const Header = ({ user, workspace }: Props) => {

  return (
    <header className='grid grid-cols-5 grid-rows-1 gap-2 overflow-x-auto overflow-hidden p-2 border'>
      <div className='col-span-2 flex items-center justify-between space-x-2 hover:cursor-pointer hover:opacity-80 ml-4'>
        <Unplug size={28} className='text-indigo-400' />
      </div>

      <div className='col-span-1 flex items-center justify-between space-x-2'>
        <div className="border-animation relative p-[1px] rounded flex-1 self-stretch overflow-hidden flex items-center justify-center" aria-hidden="true">
          <SearchBar />
        </div>
      </div>

      <div className='col-span-2 flex items-center justify-end space-x-2 hover:cursor-pointer hover:opacity-80'>
        <InviteMember />
        {/* @ts-ignore */}
        <WorkSpace workspace={workspace} />
        <UserButton user={user} size='sm' />
      </div>
    </header>
  )
}

export default Header