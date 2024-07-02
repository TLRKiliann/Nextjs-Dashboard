import type { ProductsProps } from '@/lib/definitions';
import React, { Suspense } from 'react';
import Link from 'next/link';
import TablePage from '@/components/TablePage';
import BestSellersChart from '@/components/graphs/BestSellersChart';
import StockChart from '@/components/graphs/StockChart';
//import { products } from '@/lib/products';
import Loader from '@/components/Loader';

export default async function TableTwoDefault() {

    const response = await fetch("http://localhost:3000/api/products");
    const products = (await response.json()) as ProductsProps[];

    return (
        <TablePage>
            <div className='h-[10%]'>
                <h2 className='text-xl'>Best Sellers</h2>
            </div>

            <div className='flex flex-col items-center justify-between h-[80%]'>

                
                <div className='w-[95%] h-[48%] m-auto bg-slate-100 
                    rounded-lg shadow-sm-out'>
                    <Suspense fallback={<Loader />}>
                        <BestSellersChart products={products} />
                    </Suspense>
                </div>
                

                <div className='w-[95%] h-[48%] m-auto bg-slate-100 
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
