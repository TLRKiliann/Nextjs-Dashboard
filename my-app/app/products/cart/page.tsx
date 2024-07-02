import { Metadata } from 'next';
import React, { Suspense } from 'react';
import ShoppingCartPage from '@/components/products-and-cart/ShoppingCart';
import Loader from '@/components/Loader';

export const metadata: Metadata = {
    title: {
      absolute: "Cart"
    },
    description: "cart items"
};

export default function CartPage() {
    return (
        <React.Fragment>
            <Suspense fallback={<Loader />}>
                <ShoppingCartPage />
            </Suspense>
        </React.Fragment>
    )
};
