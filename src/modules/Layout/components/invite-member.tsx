"use client";
import { Button } from '@/components/ui/button';
import { Hint } from '@/components/ui/hint';
import { UserPlus } from 'lucide-react';
import React from 'react'

const InviteMember = () => {
  return (
    <Hint
    label='Invite Member'
    
    >
    <Button
   
    className='border border-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 text-emerald-400 hover:text-emerald-300'
    >
        <UserPlus className='size-4 text-emerald-400' />
    </Button>
    </Hint>
  )
}

export default InviteMember