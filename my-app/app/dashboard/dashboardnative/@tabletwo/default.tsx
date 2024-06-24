import React from 'react';
import Link from 'next/link';
import TablePage from '@/app/components/TablePage';
import BestSellersChart from '@/app/components/graphs/BestSellersChart';

export default function TableTwoDefault() {
    return (
        <TablePage>
            <div className='h-[20%]'>
                <h2 className='text-xl'>Best Sellers</h2>
            </div>

            <div className='flex flex-col items-center justify-center w-[90%] h-[60%] m-auto bg-slate-100 
                rounded-lg shadow-sm-out'>
                <BestSellersChart />
            </div>

            <div className='flex items-end justify-end h-[20%]'>
                <li className='list-none text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    <Link href="/dashboard/dashboardnative/geolocation">Geolocation</Link>
                </li>
            </div>
        </TablePage>
    )
}
