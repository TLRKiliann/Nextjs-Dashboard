import { ProductsProps } from '@/app/lib/definitions';
import React from 'react';
import Image from 'next/image';
//import { notFound } from 'next/navigation';
import { products } from '@/app/lib/products';

export default function ProductIdPage({params}: {params: {productId: string}}) {
    
    if (!parseInt(params.productId)) {
        console.log("RSC error: params id...");
        throw new Error("Error: id is not a number");
    }

    if (parseInt(params.productId) < 1 || parseInt(params.productId) > 100) {
        console.log("RSC error: this product doesn't exist");
        //notFound();
    }

    return (
        <div className='min-h-screen bg-gradient-to-tr from-slate-700 to-slate-950 pt-[25%]'>
            {products.map((product: ProductsProps) => (
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
                                <p className='text-lg'>Quantity: {product.quantity}</p>
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
