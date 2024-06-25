import React from 'react';
import Link from 'next/link';
import TablePage from '@/app/components/TablePage';
import BestSellersChart from '@/app/components/graphs/BestSellersChart';
import StockChart from '@/app/components/graphs/StockChart';

export default function TableTwoPage() {
    return (
        <TablePage>
            <div className='h-[10%]'>
                <h2 className='text-xl'>Best Sellers</h2>
            </div>

            <div className='flex flex-col items-center justify-between h-[80%]'>

                <div className='w-[95%] h-[48%] m-auto bg-slate-100 
                    rounded-lg shadow-sm-out'>
                    <BestSellersChart />
                </div>

                <div className='w-[95%] h-[48%] m-auto bg-slate-100 
                    rounded-lg shadow-sm-out'>
                    <StockChart />
                </div>

            </div>

            <div className='flex items-end justify-end h-[10%]'>
                <li className='list-none text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    <Link href="/dashboard/dashboardnative/geolocation">Geolocation</Link>
                </li>
            </div>
        </TablePage>
    )
}
