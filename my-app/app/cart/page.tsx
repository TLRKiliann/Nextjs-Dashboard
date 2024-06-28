"use client";

import { ProductsProps } from '@/app/lib/definitions';
import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/app/lib/store';
import usePersistStore from '@/app/helpers/usePersistStore';
import Card from '@/app/components/Card';
import { products } from '../lib/products';

export default function ShoppingCartPage() {

    const [database, setDatabase] = useState<ProductsProps[]>(products);

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <div>Loading...</div>;
    }

    const handleDeleteProduct = (id: number) => {
        //store.deleteProducts(id);
    };

    const handleAddProduct = (id: number) => {
        const mappingToAdd = database?.find((data) => data.id === id);
        if (mappingToAdd) {
            const updatedProduct = { ...mappingToAdd, quantity: mappingToAdd?.quantity + 1 };
            store.addProducts(updatedProduct);
        };
        const mappingToAddDb = database.map((data) => data.id === id
            ? {...data, quantity: data.quantity + 1} 
            : data);
        setDatabase(mappingToAddDb);
    };

    const handleRemoveAllProducts = (id: number) => {
        //store.removeAllProducts(id);
    };

    return (
        <div className='min-h-screen grid grid-cols-3 grid-flow-row bg-slate-200 gap-4 p-4'>
            
            {store?.bearProducts.map((product: ProductsProps) => (
                <Card key={product.id}>
                    
                    <div className='w-full h-full flex flex-col items-center justify-between rounded-md'>

                        <div className="w-full h-auto flex flex-row items-start justify-between rounded-tl-tr-md">
                            <div className='w-full rounded-tl-md rounded-br-md'>
                                <Image src={product.img}
                                    width={100}
                                    height={100}
                                    className="w-[120px] h-[120px] object-fit rounded-tl-md rounded-br-md shadow-white" 
                                    alt="no img" 
                                />
                            </div>
                            <div className='w-full rounded-tr-md pt-4 pr-4'>
                                <h3 className='text-xl'>{product.family}</h3>
                                <h4 className='text-lg'>{product.name}</h4>
                                <h4 className='text-sm my-2'>Version: {product.version}</h4>
                                
                                {product.stock === product.quantity ? (
                                        <p className='text-base text-orange-500'>
                                            Stock: {product.stock - product.quantity}
                                        </p>
                                    ) : (
                                        <p className='text-base text-blue-400'>
                                            Stock: {product.stock - product.quantity}
                                        </p>
                                    )
                                }

                                <p className='text-base font-bold'>Price: {product.price}.-</p>
                            </div>
                        </div>

                        <div className='w-full'>
                            <div className='flex flex-row items-center justify-evenly my-4'>
                                <button type="button" onClick={() => handleDeleteProduct(product.id)}
                                    className='w-[40px] h-[40px] font-bold bg-blue-500 rounded-full disabled:opacity-50'
                                    disabled={product.quantity < 1 ? true : false}
                                    aria-label={`Remove one ${product.name}`}
                                >
                                    -
                                </button>
                                
                                    <p className='text-sm -mx-10'>Quantity: <span className="text-lg text-blue-400">{product.quantity}</span></p>
                                
                                <button type="button" onClick={() => handleAddProduct(product.id)}
                                    
                                    className='w-[40px] h-[40px] font-bold bg-blue-500 rounded-full disabled:opacity-50'
                                    disabled={product.stock === product.quantity ? true : false}
                                    aria-label={`Add one more ${product.name}`}
                                >
                                    +
                                </button>
                            </div>

                            <div className='flex justify-center'>
                                <button type="button" onClick={() => handleRemoveAllProducts(product.id)}
                                    className='font-bold px-4 py-1 bg-red-500 rounded'
                                    aria-label={`Remove all ${product.name}`}>Remove</button>
                            </div>

                        </div>

                    </div>

                </Card>
            ))}
        </div>
    )
}
