"use client";

import { ProductsProps } from '@/lib/definitions';
import React from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import usePersistStore from '@/helpers/usePersistStore';
import Link from 'next/link';

export default function ShoppingCartPage() {

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <div>Loading...</div>;
    }

    const storeQuantity: number = store.bearProducts.reduce((a: number,b: {quantity: number}) => a + b.quantity, 0);

    const handleDeleteProduct = (id: number) => {
        const findId = store.bearProducts.find((bear) => bear.id === id);
        if (findId) {
            store.decreaseQuantity(findId.id);
        }
    };

    const handleAddProduct = (id: number) => {
        const findId = store.bearProducts.find((bear) => bear.id === id);
        if (findId) {
            store.increaseQuantity(findId.id);
        }
    };

    const handleRemoveAllProducts = (id: number) => {
        const findId = store.bearProducts.find((bear) => bear.id === id);
        if (findId) {
            store.removeAllById(findId.id);
        }
    };

    return (
        <div className='w-full min-h-screen grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 
            2xl:grid-cols-5 grid-rows-3 text-slate-100 bg-slate-200 gap-4 p-4'>
        
            {storeQuantity > 0 ? (
                store.bearProducts.map((product: ProductsProps) => (
                <div key={product.id} className="w-[300px] h-[300px] bg-gradient-to-bl from-slate-950 to-slate-800/90 
                    m-auto rounded-md shadow-out">
                    
                    <div className='w-full h-full flex flex-col items-center justify-between rounded-md'>

                        <div className="w-full h-[70%] flex flex-row items-start justify-center rounded-tl-md rounded-tr-md 
                            bg-gradient-to-t from-slate-800/70 to-cyan-600">
                            <div className='w-[140px] h-[80px] border-none rounded-tl-md rounded-br-md'>
                                <Image src={product.img}
                                    width={100}
                                    height={100}
                                    className="w-full h-auto object-fit rounded-tl-md rounded-br-md" 
                                    alt="no img" 
                                />
                            </div>
                            <div className='flex flex-col items-start justify-center w-full h-full pl-4'>
                                <h3 className='text-xl font-bold'>{product.family}</h3>
                                <h4 className='text-lg'>{product.name}</h4>
                                <h4 className='text-sm my-2'>Version: {product.version}</h4>
                                
                                {product.stock === product.quantity ? (
                                        <p className='text-base text-orange-500'>
                                            Stock: {product.stock - product.quantity}
                                        </p>
                                    ) : (
                                        <p className='text-base text-cyan-300'>
                                            Stock: {product.stock - product.quantity}
                                        </p>
                                    )
                                }

                                <p className='text-base font-bold text-slate-200 mt-2'>
                                    Price: {product.price}.-
                                </p>
                            </div>
                        </div>

                        <div className='w-full'>
                            <div className='flex flex-row items-center justify-evenly my-4'>
                                <button type="button" onClick={() => handleDeleteProduct(product.id)}
                                    className='w-[40px] h-[40px] hover:text-lg font-bold transform duration-100 ease-in-out hover:scale-105 
                                        active:scale-95 text-slate-300/90 hover:text-slate-300 active:text-slate-500 bg-gradient-to-bl from-slate-900 
                                        hover:from-slate-800/80 active:from-slate-950 from-10% to-cyan-600 hover:to-cyan-500/80 
                                        active:to-cyan-700 hover:shadow-lg active:shadow-indarker to-90%
                                        rounded-full disabled:opacity-50 px-[10px] pt-[0px] hover:pt-[1px] active:pt-[1px]'
                                    disabled={product.quantity < 1 ? true : false}
                                    aria-label={`Remove one ${product.name}`}
                                >
                                    -
                                </button>
                                
                                    <p className='w-[120px] text-center text-base -mx-4'>
                                        Quantity: <span className="text-lg text-cyan-400">{product.quantity}</span>
                                    </p>
                                
                                <button type="button" onClick={() => handleAddProduct(product.id)}
                                    className='w-[40px] h-[40px] hover:text-lg font-bold transform duration-100 ease-in-out hover:scale-105 
                                        active:scale-95 text-slate-300/90 hover:text-slate-300 active:text-slate-500 bg-gradient-to-bl from-slate-900 
                                        hover:from-slate-800/80 active:from-slate-950 from-10% to-cyan-600 hover:to-cyan-500/80 
                                        active:to-cyan-700 hover:shadow-lg active:shadow-indarker to-90% 
                                        rounded-full disabled:opacity-50 px-[10px] pt-[0px] hover:pt-[1px] active:pt-[1px]'
                                    disabled={product.stock === product.quantity ? true : false}
                                    aria-label={`Add one more ${product.name}`}
                                >
                                    +
                                </button>
                            </div>

                            <div className='flex flex-col justify-center'>
                                <button type="button" onClick={() => handleRemoveAllProducts(product.id)}
                                    className='w-[90px] h-[30px] text-sm font-bold text-slate-300/70 hover:text-slate-300 active:text-slate-400
                                        transform duration-100 ease-in-out hover:scale-105 active:scale-95
                                        bg-gradient-to-tr from-red-700/70 hover:from-red-600/90 active:from-red-800/90 from-10% 
                                        via-red-500 hover:via-red-500 active:via-red-800 via-50% to-red-700/70 
                                        hover:to-red-600/90 active:to-red-800/90 to-90% m-auto rounded'
                                    aria-label={`Remove all ${product.name}`}>Remove</button>
                                <li className='list-none text-sm text-center text-blue-500 hover:text-blue-600 
                                    active:text-blue-700 py-4'>
                                    <Link href={`/products/${product.id}`}>View more</Link>
                                </li>
                            </div>

                        </div>
                    </div>
                </div>
            ))) : (
                <div 
                    className='absolute top-4 right-4 bottom-4 left-4 flex items-center justify-center 
                        bg-gradient-to-bl from-slate-500 from-10% to-slate-300 to-90%'
                >
                    <div className='rounded-md'>
                        <h3 className='text-xl text-center text-slate-100 px-2 pt-2'>
                            Cart is empty !
                        </h3>
                        <li className='list-none text-sm text-center text-blue-500 hover:text-blue-600 
                            active:text-blue-700 p-2'>
                            <Link href="/products">Go back to products</Link>
                        </li>
                    </div>
                </div>
            )}
        </div>
    )
}
