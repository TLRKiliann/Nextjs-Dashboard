import React from 'react';
import Link from 'next/link';
import TablePage from '@/app/components/TablePage';

export default function TableTwoPage() {
    return (
        <TablePage>
            <div className='h-[10%] border'>
                <h2 className='text-xl'>second 2</h2>
            </div>

            <ul className='flex flex-col items-center justify-center w-full h-[80%] border'>
                <li className='w-full bg-blue-300 my-2 border rounded-lg'>
                    <div className='flex items-center justify-between h-[40px] px-4 border'>
                        <p>Earnings</p><p>icons</p>
                    </div>
                </li>
                <li className='w-full bg-pink-300 my-2 border rounded-lg'>
                    <div className='flex items-center justify-between h-[40px] px-4 border'>
                        <p>Spend this month</p><p>icons</p>
                    </div>
                </li>
                <li className='w-full bg-emerald-300 my-2 border rounded-lg'>
                    <div className='flex items-center justify-between h-[40px] px-4 border'>
                        <p>Sales</p><p>icons</p>
                    </div>
                </li>
            </ul>

            <div className='flex items-end justify-end h-[10%] border'>
                <li className='list-none text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    <Link href="/dashboard/dashboardnative/geolocation">Geolocation</Link>
                </li>
            </div>
        </TablePage>
    )
}
