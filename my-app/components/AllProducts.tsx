"use client";

import { useEffect, useState } from 'react';
import type { Product } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { fetchDataFromApi } from '@/utils/api-request';
import StoreOfProducts from '@/components/products-and-cart/store-of-products';
import Loader from '@/components/Loader';
import usePersistStore from '@/helpers/usePersistStore';
import { useStore } from '@/stores/store';

export default function AllProducts() {
    
    // zustand
    const store = usePersistStore(useStore, (state) => state);
    
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: () => fetchDataFromApi(),
        staleTime: 10 * 1000,
    });

    useEffect(() => {
        const callerData = () => {
            if (data) {
                store?.setProducts(data)
                console.log("Data products found!");
            } else {
                console.log("No data products found!");
            }
        }
        callerData();
        return () => console.log("clean-up");
    }, [data]);

    if (!store || !data) {
        return <Loader />
    };

    if (isLoading) {
        return <Loader />;
    };

    if (isError) {
        throw new Error("Error - useQuery: ", error);
    };

    return (
        <div className='min-h-screen grid grid-cols-3 xl:grid-cols-4 grid-rows-3 bg-slate-100 gap-4 p-4 pt-[12vh]'>
            {store.bearProducts.map((product: Product) => (
                <StoreOfProducts
                    key={product.id}
                    product={product}
                /> 
            ))}
        </div>
    )
};
