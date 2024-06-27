import type { Metadata } from 'next';
import type { ProductsProps } from '../lib/definitions';
import React from 'react';
import AllProducts from '@/app/components/AllProducts';
//import { products } from '@/app/lib/products';

export const metadata: Metadata = {
    title: "Products",
    description: "access user"
};

export default async function ProductsPage() {
    
    const response = await fetch("http://localhost:3000/api/products");
    const products = (await response.json()) as ProductsProps[];

    return (
        <>
            <AllProducts products={products} />
        </>
    )
};
