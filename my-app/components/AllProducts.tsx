import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import type { Product } from '@prisma/client';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import Card from '@/components/products-and-cart/Card';
import Loader from '@/components/Loader';

export default async function AllProducts() {

    const session = await auth();
    const user = session?.user;

    if (!user) {
        return redirect("/api/auth/signin");
    };

    // all products
    const products: Product[] = await prisma.product.findMany({
        orderBy: {
            id: "asc",
        }
    });

    if (!products) {
        throw new Error("Error: fetch products failed!");
    };

    return (
        <div className='min-h-screen grid grid-cols-3 xl:grid-cols-4 grid-rows-3 bg-slate-100 gap-4 p-4 pt-[12vh]'>
            <Suspense fallback={<Loader />}>
                {products.map((product: Product) => (
                    <Card
                        key={product.id}
                        product={product}
                    /> 
                ))}
            </Suspense>
        </div>
    )
};