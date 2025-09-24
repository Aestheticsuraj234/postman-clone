import { SidebarProvider } from '@/components/ui/sidebar'
import { currentUser } from '@/modules/authentication/actions'
import Header from '@/modules/Layout/components/header'
import { initializeWorkspace } from '@/modules/workspace/actions'
import TabbedLeftPanel from '@/modules/workspace/components/tabbed-left-panel'
import React from 'react'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const workspace = await initializeWorkspace()

  const user = await currentUser()
  return (
    <>
      {/* @ts-ignore */}
      <Header user={user!} workspace={workspace.workspace!} />
      <main className='max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden'>
        <div className="flex h-full w-full">
          
          <div className="w-12 border-r border-zinc-800 bg-zinc-900">
            <TabbedLeftPanel />
          </div>
          <div className="flex-1 bg-zinc-950">
            {children}
          </div>
        </div>
      </main>
    </>
  )
}

export default RootLayout