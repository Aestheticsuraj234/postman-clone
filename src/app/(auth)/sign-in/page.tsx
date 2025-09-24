"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signIn } from '@/lib/auth-client'
import { Chrome, Github } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


const LoginPage = () => {

  return (
    <section className='flex min-h-screen bg-zinc-50 dark:bg-transparent px-4 py-16 md:py-32 '>
      <div className='bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)] '>
        <div className='p-8 pb-6'>
          <div>
            <Link href={"/"}>
              <h1 className='text-2xl font-bold'>Postman</h1>
            </Link>
            <h1 className='mb-1 mt-4 text-xl font-semibold'>Sign in to PostMan</h1>
            <p className="text-sm">Welcome back! Sign in to continue</p>
          </div>

          <div className='mt-6 grid grid-cols-1 gap-3'>
            <Button variant='outline' className='w-full' onClick={() => signIn.social({
              provider: 'github',
              callbackURL: "/"
            })}>
              <Github className='mr-2 h-4 w-4' />
              Sign in with GitHub
            </Button>
          </div>
          
          <div className='mt-6 grid grid-cols-1 gap-3'>
            <Button variant='outline' className='w-full' onClick={() => signIn.social({
              provider: 'google',
              callbackURL: "/"
            })}>
              <Chrome className='mr-2 h-4 w-4' />
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LoginPage