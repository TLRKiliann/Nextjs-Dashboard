import { ProductsProps } from '@/app/lib/definitions';
import React from 'react'
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
        <div className='w-full h-full mt-[7%] border'>
            {products.map((product: ProductsProps) => (
                parseInt(params.productId) === product.id ? (
                    <div key={product.id}>
                        <h3>{product.family}</h3>
                        <h4>{product.name}</h4>
                        <p>{product.stock}</p>
                        <p>{product.price}</p>
                    </div>
                ) : null
            ))}
        </div>
    )
}
