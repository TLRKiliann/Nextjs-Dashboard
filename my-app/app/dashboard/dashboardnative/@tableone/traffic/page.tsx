"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import TablePage from '@/app/components/TablePage';
import LineChart from '@/app/components/graphs/LineChart';

export default function TrafficPage() {
    const router = useRouter();
    return (
        <TablePage>
            <div className='h-[10%] border'>
                <h2 className='text-xl'>Daily Traffic</h2>
            </div>

            <div className='h-[80%] -mx-4'>
                <LineChart />
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