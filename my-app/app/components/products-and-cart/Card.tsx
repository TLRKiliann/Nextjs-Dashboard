"use client";

import { ProductsProps } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react';
import { useStore } from '@/app/lib/store';
import usePersistStore from '@/app/helpers/usePersistStore';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '../Loader';

type ProductProps = {
    product: ProductsProps;
};

export default function Card({product}: ProductProps) {

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <Loader />;
    };

    //console.log(store.bearProducts, "store.bearProducts");

    const handleAddProduct = () => {
        store.addProducts(product);
    };

    return (
        <div key={product.id} className="w-full h-full bg-gradient-to-tr from-slate-700 to-slate-950 rounded-md">
            
            <div className='w-full h-full flex flex-col items-center justify-between rounded-md'>

                <div className="w-full h-auto flex flex-row items-start justify-between rounded-tl-tr-md">
                    <div className='w-full rounded-tl-md rounded-br-md'>
                        <Image src={product.img}
                            width={100}
                            height={100}
                            className="w-[120px] h-auto object-fit rounded-tl-md rounded-br-md shadow-white" 
                            alt="no img" 
                        />
                    </div>
                    <div className='w-[340px] h-[160px] rounded-tr-md mr-8  pt-4 pr-4'>
                        <h3 className='text-xl'>{product.family}</h3>
                        <h4 className='text-lg'>{product.name}</h4>
                        <h4 className='text-sm my-2'>Version: {product.version}</h4>
                        <p className='text-base font-bold'>Price: {product.price}.-</p>
                    </div>
                </div>

                <div className='w-full'>
                    <div className='flex items-center justify-center mt-4'>
                        
                        <button type="button" onClick={handleAddProduct}
                            className='w-full text-sm font-bold bg-blue-500 hover:bg-blue-600 
                                active:bg-blue-700 rounded disabled:opacity-50 mx-4 px-4 py-2'
                            aria-label={`Add one more ${product.name}`}
                        >
                            Add to Cart
                        </button>
                    </div>

                </div>

                <div className='text-center my-4'>
                    <li className='list-none text-blue-400/80 hover:text-blue-600 active:text-blue-700'>
                        <Link href={`/products/${product.id}`}>
                            View product
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    )
}
