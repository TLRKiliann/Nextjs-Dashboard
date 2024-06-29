import React, { Suspense } from 'react';
import ShoppingCartPage from '@/app/components/ShoppingCart';
import Loader from '@/app/components/Loader';

export default function CartPage() {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <ShoppingCartPage />
            </Suspense>
        </>
    )
};
