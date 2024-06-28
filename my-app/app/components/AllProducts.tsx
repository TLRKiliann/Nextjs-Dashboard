"use client";

import type { ProductsProps } from '../lib/definitions';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductsData } from '@/app/utils/api-request';
import Card from '@/app/components/Card';

export default function AllProducts() {
   
    // useQuery
    const { data, isLoading, isError, error } = useQuery<ProductsProps[]>({
        queryKey: ["products"],
        queryFn: () => getProductsData(),
        staleTime: 10 * 1000,
    });

    const [database, setDatabase] = useState<ProductsProps[]>(data!);

    if (isLoading) {
        return <div>Loading...</div>
    };

    if (!data) {
        return <div>No data</div>
    } else {
        console.log("data + cores : ", data)
    };

    if (isError) {
        return <h2>{error.message}</h2>
    };

    return (
        <div className='min-h-screen grid grid-cols-3 grid-flow-row bg-slate-200 gap-4 p-4'>
            {database?.map((product: ProductsProps) => (
                <Card 
                    key={product.id}
                    product={product}
                />                
            ))}
        </div>
    )
}
