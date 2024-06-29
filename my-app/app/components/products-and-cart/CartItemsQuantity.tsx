"use client";

import React from 'react';
import { useStore } from '@/app/lib/store';
import usePersistStore from '@/app/helpers/usePersistStore';
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
            <p className={`${storeQuantity === 0 ? "opacity-0" : "opacity-100"} flex items-center justify-center 
                border-none w-[24px] h-[24px] text-xs text-slate-200 bg-blue-500 rounded-full mt-[20px] ml-[12px]`}>
                {storeQuantity}
            </p>
        </div>
    )
}
