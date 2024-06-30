"use client";

import { ProductsProps } from '@/app/lib/definitions';
import React, { useState } from 'react';
import { useStore } from '@/app/lib/store';
import usePersistStore from '@/app/helpers/usePersistStore';
import { useQuery } from '@tanstack/react-query';
import { getProductsData } from '@/app/utils/api-request';
import Image from 'next/image';
import Loader from '../Loader';

export default function ProductIdCard({params}: {params: {productId: string}}) {

    // useQuery
    const { data, isLoading, isError, error } = useQuery<ProductsProps[]>({
        queryKey: ["products"],
        queryFn: () => getProductsData(),
        staleTime: 10 * 1000,
    });

    if (!data) {
        throw new Error("Error: problem with data (useQuery)");
    };

    if (isError) {
        throw new Error("Error - useQuery: ", error);
    };
    
    const [database] = useState<ProductsProps[]>(data!);

    // zustand
    const store = usePersistStore(useStore, (state) => state);
    
    if (!store) {
        return <Loader />;
    };

    const storeQuantity: number = store.bearProducts.reduce((a: number,b: {quantity: number}) => a + b.quantity, 0);

    // useQuery
    if (isLoading) {
        return <Loader />
    };

    return (
        <div className='min-h-screen bg-gradient-to-tr from-slate-700 to-slate-950 pt-[25%]'>
            {database.map((product: ProductsProps) => (
                parseInt(params.productId) === product.id ? (

                    <div key={product.id} 
                        className='w-[360px] m-auto bg-gradient-to-tr from-slate-200 to-slate-300 rounded-md 
                        shadow-indarker p-4'>

                        <div className='flex flex-row items-start justify-between
                            bg-gradient-to-tr from-slate-700 to-slate-950 rounded-md shadow-outdarker p-4'>
                            
                            <div>
                                <Image
                                    src={product.img}
                                    width={100}
                                    height={100}
                                    className="object-fit rounded-md"
                                    alt="no img"
                                />
                            </div>
                            
                            <div>
                                <h3 className='text-xl font-bold'>Family: {product.family}</h3>
                                <h4 className='text-lg'>Model: {product.name}</h4>
                                <p className='text-base'>Version: {product.version}</p>
                                <p className='text-base'>Stock: {product.stock}pces</p>
                                <p className='text-lg'>Quantity: {storeQuantity}</p>
                                <p className='text-lg font-bold'>Price: {product.quantity !== 0 
                                    ? product.quantity * product.price 
                                    : product.price}.-
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            ))}
        </div>
    )
}
