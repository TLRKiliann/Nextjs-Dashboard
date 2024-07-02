import React, { Suspense } from 'react';
import TablePage from '@/components/TablePage';
import Profile from '@/components/menu-items/Profile';
import { customers } from '@/lib/datadb';
import ButtonGoBack from '@/components/ButtonGoBack';
import Loader from '@/components/Loader';

export default function TrafficPage() {
    return (
        <TablePage>
            <div className='h-[10%]'>
                <h2 className='text-xl'>Profile</h2>
            </div>
            
            <div className='h-[80%]'>
                <Suspense fallback={<Loader />}>
                    <Profile customers={customers} />
                </Suspense>
            </div>
            
            <ButtonGoBack text="customers" />
        </TablePage>
    )
}