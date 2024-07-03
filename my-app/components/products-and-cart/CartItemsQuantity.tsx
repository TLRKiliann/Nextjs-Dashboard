"use client";

import React from 'react';
import { useStore } from '@/lib/store';
import usePersistStore from '@/helpers/usePersistStore';
import Loader from '../Loader';

export default function CartItemsQuantity() {

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <Loader />;
    };

    const storeQuantity: number = store?.bearProducts.reduce((a: number,b: {quantity: number}) => a + b.quantity, 0);

    return (
        <div className='absolute top-0'>
            <p className={`${storeQuantity > 0 ? "opacity-100" : "opacity-0"} flex items-center justify-center 
                border-none w-[24px] h-[24px] text-sm font-bold text-white bg-blue-500 rounded-full mt-[20px] ml-[12px]`}>
                {storeQuantity}
            </p>
        </div>
    )
}
