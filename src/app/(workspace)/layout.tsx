import { currentUser } from '@/modules/authentication/actions'
import Header from '@/modules/Layout/components/header'
import React from 'react'

const RootLayout = async({children}:{children: React.ReactNode}) => {
  const user = await currentUser()
  return (
    <main className='w-screen h-screen '>
        <Header user={user}/>
      {children}
    </main>
  )
}

export default RootLayout