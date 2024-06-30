"use client";

import type { ProductsProps } from '../lib/definitions';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductsData } from '@/app/utils/api-request';
import Card from './products-and-cart/Card';
import Loader from './Loader';

export default function AllProducts() {
   
    // useQuery
    const { data, isLoading, isError, error } = useQuery<ProductsProps[]>({
        queryKey: ["products"],
        queryFn: () => getProductsData(),
        staleTime: 10 * 1000,
    });

    const [database] = useState<ProductsProps[]>(data!);

    if (isLoading) {
        return <Loader />
    };

    if (!data) {
        throw new Error("Error: problem with data (useQuery)");
    };

    if (isError) {
        throw new Error("Error - useQuery: ", error);
    };

    return (
        <div className='min-h-screen grid grid-cols-3 xl:grid-cols-4 grid-rows-3 bg-slate-200 gap-4 p-4'>
            {database?.map((product: ProductsProps) => (
                <Card 
                    key={product.id}
                    product={product}
                />                
            ))}
        </div>
    )
};