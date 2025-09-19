import { currentUser } from '@/modules/authentication/actions'
import Header from '@/modules/Layout/components/header'
import { initializeWorkspace } from '@/modules/workspace/actions'
import React from 'react'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const workspace = await initializeWorkspace()
  console.log(JSON.stringify(workspace))
  const user = await currentUser()
  return (
    <main className='w-screen h-screen '>
      {/* @ts-ignore */}
      <Header user={user!} workspace={workspace.workspace!} />
      {children}
    </main>
  )
}

export default RootLayout