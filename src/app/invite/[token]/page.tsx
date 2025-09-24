import db from '@/lib/db';
import { currentUser } from '@/modules/authentication/actions';
import { acceptWorkspaceInvite } from '@/modules/invites/actions';
import { redirect } from 'next/navigation';
import React from 'react'

const Invite = async ({ params }: { params: Promise<{ token: string }> }) => {
    const { token } = await params;
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in');
    }

    const invite = await acceptWorkspaceInvite(token);

    if (invite.success) {
        redirect('/');
    }

    return redirect('/sign-in');

}

export default Invite