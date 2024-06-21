"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import TablePage from '@/app/components/TablePage';
//import MapChart from '@/app/components/graphs/MapChart';

export default function GeolocationPage() {
    const router = useRouter();
    return (
        <TablePage>
            <div className='h-[10%] border'>
                <h2 className='text-xl'>Geolocation</h2>
            </div>

            <div className='w-full h-[80%]'>
                {/* <MapChart /> */}
            </div>

            <div className='flex items-end justify-end h-[10%] border'>
                <button type="button" onClick={() => router.back()} 
                    className='text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    Table 2
                </button>
            </div>
        </TablePage>
    )
}
