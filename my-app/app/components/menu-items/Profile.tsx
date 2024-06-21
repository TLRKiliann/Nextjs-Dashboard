import React from 'react';
import Link from 'next/link';
import TablePage from '../TablePage';

export default function Profile() {
    return (
        <TablePage>
            <div className='h-[10%] border'>
                <h2 className='text-xl'>Profile</h2>
            </div>

            <div className='flex flex-col items-center justify-center w-full h-[80%] border'>
                Profile!!!
            </div>

            <div className='flex items-end justify-end h-[10%] border'>
                <li className='list-none text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    <Link href="/dashboard/dashboardnative">Go back</Link>
                </li>
            </div>
        </TablePage>
    )
}
