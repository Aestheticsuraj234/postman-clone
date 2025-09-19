import { Loader2 } from 'lucide-react'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex flex-col justify-center items-center '>
        <Loader2 className='animate-spin text-indigo-400' size={40}/>
    </div>
  )
}

export default LoadingPage