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
        <div className='w-full min-h-screen flex flex-col text-slate-500 bg-slate-100 p-4 pt-24'>
        
            {storeQuantity > 0 ? (
                store.bearProducts.map((product: ProductsProps) => (
                
                <div key={product.id} className="w-full h-20 flex items-center justify-evenly bg-white rounded-md shadow-sm-out my-1 p-2">
                    
                    <div className='w-[70px] flex items-center justify-center border-none rounded-tl-md 
                        rounded-br-md'>
                        <Image src={product.img}
                            width={70}
                            height={70}
                            className="w-full h-auto object-fit rounded-tl-md rounded-br-md" 
                            alt="no img" 
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between w-[60%] h-full px-4'>
                        
                        <h3 className='sm:w-[50px] lg:w-[70px] sm:text-base lg:text-xl font-bold'>{product.family}</h3>

                        <h4 className='sm:w-[50px] lg:w-[70px] text-center sm:text-base lg:text-xl'>{product.name}</h4>
                        
                        <h4 className='w-[160px] text-xs'>Version: {product.version}</h4>
                        
                        <div className='w-[100px] h-full flex items-center justify-center bg-slate-100/70 py-10'>
                            {product.stock === product.quantity ? (
                                    <p className='text-sm text-red-500'>
                                        Stock: <span className='font-bold'>{product.stock - product.quantity}</span>
                                    </p>
                                ) : (
                                    <p className='text-sm text-blue-500'>
                                        Stock: <span className='font-bold'>{product.stock - product.quantity}</span>
                                    </p>
                                )
                            }
                        </div>

                        <div className='flex flex-row items-center justify-around w-[30%]'>
                            <p className='sm:text-sm lg:text-base font-bold'>
                                {product.price}.-
                            </p>

                            <li className='list-none text-xs text-center text-blue-500 hover:text-blue-600 
                                active:text-blue-700'>
                                <Link href={`/products/${product.id}`}>View more</Link>
                            </li>
                        </div>


                    </div>

                    <div className='w-[13%] flex items-center justify-center bg-slate-100/70 py-8'>
                        <p className='text-sm text-center text-blue-500'>
                            Quantity: <span className='font-bold'>{product.quantity}</span>
                        </p>
                    </div>

                    <div className='w-[10%] flex flex-row items-center justify-evenly'>
                        <button type="button" onClick={() => handleDeleteProduct(product.id)}
                            className="w-[38px] h-[38px] text-slate-100 font-bold bg-blue-500 
                                hover:bg-blue-600/90 active:bg-blue-600 rounded-full shadow-sm-out"
                            disabled={product.quantity < 1 ? true : false}
                            aria-label={`Remove one ${product.name}`}
                        >
                            -
                        </button>
                        
                        <button type="button" onClick={() => handleAddProduct(product.id)}
                            className="w-[38px] h-[38px] text-slate-100 font-bold bg-blue-500 
                                hover:bg-blue-600/90 active:bg-blue-600 rounded-full shadow-sm-out"
                            disabled={product.stock === product.quantity ? true : false}
                            aria-label={`Add one more ${product.name}`}
                        >
                            +
                        </button>
                    </div>

                    <div className='w-[10%] flex items-center justify-center'>
                        <button type="button" onClick={() => handleRemoveAllProducts(product.id)}
                            className="text-slate-50 bg-red-500 hover:bg-red-600/90 active:bg-red-700
                                rounded-full shadow-sm-out px-4 py-1"
                            aria-label={`Remove all ${product.name}`}>
                            Remove
                        </button>
                    </div>


                </div>
            ))) : (
                <div 
                    className='absolute top-10 right-0 bottom-0 left-0 flex items-center justify-center 
                        bg-gradient-to-bl from-sky-100 from-10% to-slate-100 to-90%'
                >
                    <div className='rounded-md'>
                        <h3 className='text-xl text-center text-slate-700 px-2 pt-2'>
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
