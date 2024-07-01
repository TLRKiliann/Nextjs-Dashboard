import type { ProductsProps } from '@/app/lib/definitions';
import React, { Suspense } from 'react';
import Link from 'next/link';
import TablePage from '@/app/components/TablePage';
import BestSellersChart from '@/app/components/graphs/BestSellersChart';
import StockChart from '@/app/components/graphs/StockChart';
//import { products } from '@/app/lib/products';
import Loader from '@/app/components/Loader';

export default async function TableTwoPage() {

    const response = await fetch("http://localhost:3000/api/products");
    const products = (await response.json()) as ProductsProps[];

    return (
        <TablePage>
            <div className='h-[10%]'>
                <h2 className='text-xl'>Best Sellers</h2>
            </div>

            <div className='flex flex-col items-center justify-between h-[80%]'>

                <div className='w-[95%] h-[44%] m-auto bg-slate-100 
                    rounded-lg shadow-sm-out'>
                    <Suspense fallback={<Loader />}>
                        <BestSellersChart products={products} />
                    </Suspense>
                </div>
                
                <div className='w-[95%] h-[44%] m-auto bg-slate-100 
                    rounded-lg shadow-sm-out'>
                    <Suspense fallback={<Loader />}>
                        <StockChart products={products} />
                    </Suspense>
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
