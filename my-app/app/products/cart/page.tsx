import { Metadata } from 'next';
import React, { Suspense } from 'react';
import ShoppingCartPage from '@/app/components/products-and-cart/ShoppingCart';
import Loader from '@/app/components/Loader';

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
