"use client";

import { ProductsProps } from '@/app/lib/definitions';
import React, { useState } from 'react';
import Image from 'next/image';
import { products } from '@/app/lib/products';

export default function Products() {

    const [listProducts, setListProducts] = useState<ProductsProps[]>(products);

    const handleAdd = (id: number) => {
        const findById: ProductsProps[] = listProducts.map((list: ProductsProps) => list.id === id 
            ? {...list, stock: list.stock - 1, quantity: list.quantity + 1} : list);
        setListProducts(findById);
    };

    const handleDelete = (id: number) => {
        const findById: ProductsProps[] = listProducts.map((list: ProductsProps) => list.id === id 
            ? {...list, stock: list.stock + 1, quantity: list.quantity - 1} : list);
        setListProducts(findById);
    };

    return (
        <div className='relative top-0 h-[60%] border z-10'>
            
            <div className='flex flex-col items-center justify-center w-full h-[100%] 
                overflow-y-scroll no-scrollbar pt-52'>

                {listProducts.map((product: ProductsProps) => (
                    <div key={product.id} 
                        className='flex flex-row items-center justify-between w-full h-full bg-slate-50 
                            rounded-lg shadow-sm-out p-2 m-2'>

                        <div className='w-[60px] h-[60px]'>
                            <Image 
                                src={product.img} 
                                width={100}
                                height={100}
                                className='w-[60px] h-[60px] object-fit rounded-lg shadow-sm-out'
                                alt="no img" 
                            />
                        </div>

                        <div className='flex flex-row font-bold'>
                            <h3>{product.family}</h3>
                            <h4>&nbsp;{product.name}</h4>
                        </div>

                        <div className='flex flex-col'>
                            <p>Stock: {product.stock}</p>
                            <p className='font-bold'>Price: {product.price}.-</p>
                        </div>

                        <p>Quantity: {product.quantity}</p>

                        <div className='flex items-center justify-between'>
                            
                            <button type="button" 
                                onClick={() => handleAdd(product.id)}
                                className='text-slate-100 bg-blue-500 
                                hover:bg-blue-600 active:bg-blue-700
                                px-4 py-1 rounded shadow-sm-out'
                            >
                                Add
                            </button>
                            <button type="button" 
                                onClick={() => handleDelete(product.id)}
                                className='text-slate-100 bg-blue-500 
                                hover:bg-blue-600 active:bg-blue-700
                                px-4 py-1 rounded shadow-sm-out ml-4'
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}
