"use client";

import { handleSaveProduct } from '@/lib/actions';
import React, { useState } from 'react';

type AllStateProps = {
    family: string;
    name: string;
    stock: number;
    price: number;
}

export default function FormChangeProduct({ id, family, name, stock, price }: {
    id: number;
    family: string;
    name: string;
    stock: number;
    price: number; }) {

    const [allState, setAllState] = useState<AllStateProps>({
        family: family,
        name: name,
        stock: stock,
        price: price,
    });

    const handleFamily = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllState((prev: AllStateProps) => ({...prev, family: e.target.value}));
    };
    
    const handleName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllState((prev: AllStateProps) => ({...prev, name: e.target.value}));
    };

    const handleStock = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllState((prev: AllStateProps) => ({...prev, stock: Number(e.target.value)}));
    };

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllState((prev: AllStateProps) => ({...prev, price: Number(e.target.value)}));
    };

    return (
        <form key={id}
            action={() => handleSaveProduct(id, allState.family, allState.name, allState.stock, allState.price)}
            className='w-full flex flex-row items-center justify-between'    
        >

            <input type="text" value={allState.family} onChange={(e)=> handleFamily(e)} 
                placeholder={family} 
                className='w-1/5 bg-slate-50 border border-slate-500/70 outline-none ring-none  
                    focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                    focus:ring-blue-300 focus:bg-white rounded ml-2 px-2 py-1'
            />

            <input type="text" value={allState.name} onChange={(e)=> handleName(e)} 
                placeholder={name} 
                className='w-1/5 bg-slate-50 border border-slate-500/70 outline-none ring-none  
                    focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                    focus:ring-blue-300 focus:bg-white rounded ml-2 px-2 py-1'
            />

            <input type="text" value={allState.stock} onChange={(e)=> handleStock(e)} 
                placeholder={String(stock)} 
                className='w-1/5 bg-slate-50 border border-slate-500/70 outline-none ring-none  
                    focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                    focus:ring-blue-300 focus:bg-white rounded ml-2 px-2 py-1'
            />

            <input type="text" value={allState.price} onChange={(e)=> handlePrice(e)} 
                placeholder={String(price)} 
                className='w-1/5 bg-slate-50 border border-slate-500/70 outline-none ring-none  
                    focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                    focus:ring-blue-300 focus:bg-white rounded ml-2 px-2 py-1'
            />

            <button 
                type="submit"
                className='text-slate-100 bg-blue-500 
                    hover:bg-blue-600 active:bg-blue-700
                    mx-4 px-4 py-1 rounded shadow-sm-out'
            >
                Save
            </button>

        </form>
    )
};
