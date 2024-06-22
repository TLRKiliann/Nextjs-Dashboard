"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import TablePage from '@/app/components/TablePage';
import Profile from '@/app/components/menu-items/Profile';

export default function TrafficPage() {
    const router = useRouter();
    return (
        <TablePage>
            <div className='h-[10%] border'>
                <h2 className='text-xl'>Profile</h2>
            </div>

            <div className='h-[80%]'>
                <Profile />
            </div>

            <div className='flex items-end justify-end h-[10%] border'>
                <button type="button" onClick={() => router.back()} 
                    className='text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    Customers
                </button>
            </div>
        </TablePage>
    )
}