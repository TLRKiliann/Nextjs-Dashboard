"use client";

import { ProductsProps } from '@/app/lib/definitions';
import React from 'react';
import { useStore } from '@/app/lib/store';
import usePersistStore from '@/app/helpers/usePersistStore';
import Link from 'next/link';
import Image from 'next/image';
import Loader from './Loader';

type ProductProps = {
    product: ProductsProps;
};

export default function Card({product}: ProductProps) {

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <Loader />;
    };

    console.log(store.bearProducts, "store.bearProducts");
    
    const storeQuantity = store?.bearProducts.map((cartItem) => (
        cartItem.id === product.id ? {...cartItem, quantity: cartItem.quantity} : cartItem)
    );
    console.log(storeQuantity);

    const handleDeleteProduct = () => {
        store.deleteProducts(product);
    };

    const handleAddProduct = () => {
        store.addProducts(product);
        /* const findId = store.bearProducts.find((bear) => bear.id === id);
        if (findId) {
            store.increaseQuantity(findId.id);
        } */
    };

    const handleRemoveAllProducts = () => {
        store.removeAllById(product.id)
    };

    return (
        <div key={product.id} className="w-full h-full bg-gradient-to-tr from-slate-700 to-slate-950 rounded-md">
            
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
                        <button type="button" onClick={handleDeleteProduct}
                            className='w-[40px] h-[40px] font-bold bg-blue-500 rounded-full disabled:opacity-50'
                            disabled={product.quantity < 1 ? true : false}
                            aria-label={`Remove one ${product.name}`}
                        >
                            -
                        </button>
                        
                        <p className='text-sm -mx-10'>Quantity: <span className="text-lg text-blue-400">
                            {product.quantity}
                            </span>
                        </p>
                        
                        <button type="button" onClick={handleAddProduct}
                            className='w-[40px] h-[40px] font-bold bg-blue-500 rounded-full disabled:opacity-50'
                            disabled={product.stock === product.quantity ? true : false}
                            aria-label={`Add one more ${product.name}`}
                        >
                            +
                        </button>
                    </div>

                    <div className='flex justify-center'>
                        <button type="button" onClick={handleRemoveAllProducts}
                            className='font-bold px-4 py-1 bg-red-500 rounded'
                            aria-label={`Remove all ${product.name}`}>Remove</button>
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
