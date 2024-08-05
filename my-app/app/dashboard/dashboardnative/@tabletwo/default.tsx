import type { Cart } from '@prisma/client';
import prisma from '@/prisma/prisma';
import React, { Suspense } from 'react';
import TablePage from '@/components/TablePage';
import BestSellersChart from '@/components/menu-items/graphs/BestSellersChart';
import StockChart from '@/components/menu-items/graphs/StockChart';
import Loader from '@/components/Loader';

export default async function TableTwoDefault() {

    const products: Cart[] = await prisma.cart.findMany({
        orderBy: {
            id: "asc",
        }
    });

    if (products.length === 0) {
        throw new Error("Error: products fetch failed!");
    };

    return (
        <TablePage title="Best Sellers" url="/dashboard/dashboardnative/geolocation" link="Geolocation">

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

        </TablePage>
    )
}
