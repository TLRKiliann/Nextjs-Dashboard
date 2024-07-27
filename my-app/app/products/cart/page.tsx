import type { Metadata } from 'next';
import type { Product } from '@prisma/client';
import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import ShoppingCartPage from '@/components/products-and-cart/ShoppingCart';
import Loader from '@/components/Loader';

export const metadata: Metadata = {
    title: "Cart",
    description: 'Generated by NextJS14',
};

type UserType = {
    products: Product[]
};

export default async function CartPage() {

    const session = await auth();
    const userSession = session?.user;
    
    if (!userSession?.id) {
        return redirect("/api/auth/signin");
    };

    // products by user
    const user: UserType | null = await prisma.user.findUnique({
        where: {
            id: userSession.id,
        },
        include: {
            products: {
                where: {
                    authorId: userSession.id,
                },
                orderBy: {
                    id: "asc"
                }
            }
        },
    });

    if (!user?.products) {
        throw new Error("Error: server action in cart");
    };

    return (
        <React.Fragment>
            <Suspense fallback={<Loader />}>
                <ShoppingCartPage products={user.products} />
            </Suspense>
        </React.Fragment>
    )
};
