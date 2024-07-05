"use client";

import { ProductsProps } from '@/lib/definitions';
import { useStore } from '@/lib/store';
import usePersistStore from '@/helpers/usePersistStore';
import Image from 'next/image';

export default function OrderItems() {

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full h-full border border-slate-500/30 rounded'>

            <div className='flex flex-col w-full h-full p-4'>

                <div>
                    <h2 className='font-bold'>Order Items</h2>
                </div>

                <div className='w-full bg-slate-100 mt-4 rounded'>
                    {store.bearProducts.map((product: ProductsProps) => (
                        <div key={product.id} className='flex flex-row items-center justify-between bg-white m-4 p-3 rounded shadow-lg'>
                            <Image
                                src={product.img}
                                width={40}
                                height={40}
                                alt="no img" 
                                className="w-[40px] h-[40px] object-fit"
                            />
                            <p className='font-bold'>{product.family}</p>
                            <p>{product.name}</p>
                            <p>{product.quantity}pces</p>
                            <p>{product.price}.-</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
