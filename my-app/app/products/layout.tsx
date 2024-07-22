import type { Metadata } from "next";
import React from 'react';
import HeaderProducts from '@/components/products-and-cart/HeaderProducts';

export const metadata: Metadata = {
    title: {
      default: "Products",
      template: "%s | e-com"
    },
    description: 'Generated by NextJS14',
};

export default async function ProductLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <HeaderProducts />
            {children}
        </div>
    )
}
