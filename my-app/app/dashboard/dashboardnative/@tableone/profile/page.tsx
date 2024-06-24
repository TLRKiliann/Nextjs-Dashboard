import React from 'react';
import TablePage from '@/app/components/TablePage';
import Profile from '@/app/components/menu-items/Profile';
import { customers } from '@/app/lib/datadb';
import ButtonGoBack from '@/app/components/ButtonGoBack';

export default function TrafficPage() {
    return (
        <TablePage>
            <div className='h-[10%]'>
                <h2 className='text-xl'>Profile</h2>
            </div>

            <div className='h-[80%]'>
                <Profile customers={customers} />
            </div>

            <ButtonGoBack text="customers" />
        </TablePage>
    )
}