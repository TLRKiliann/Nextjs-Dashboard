import type { Metadata } from 'next';
import type { ProductsProps } from '../lib/definitions';
import React from 'react';
import AllProducts from '@/app/components/AllProducts';

export const metadata: Metadata = {
    title: {
      absolute: "Products"
    },
    description: "list of products"
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
