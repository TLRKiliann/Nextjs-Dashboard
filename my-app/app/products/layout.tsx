import React from 'react';
import HeaderProducts from '@/components/products-and-cart/HeaderProducts';

export default function ProductLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <HeaderProducts />
            {children}
        </div>
    )
}
