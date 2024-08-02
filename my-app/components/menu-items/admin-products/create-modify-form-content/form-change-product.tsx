"use client";

import { handleSaveProduct } from '@/lib/actions';
import React, { useState } from 'react';
import InputModify from './input-modify';
import toast from 'react-hot-toast';
import { useAction } from 'next-safe-action/hooks';

type AllStateProps = {
    family: string;
    name: string;
    stock: number;
    price: number;
};

export default function FormChangeProduct({family, name, stock, price}: AllStateProps, {id}: {id: number}) {

    // next-safe-action
    const { execute } = useAction(handleSaveProduct, {
        onSuccess: () => {
            toast.success("Successfully saved!");
            console.log("Successfully saved!");
        },
        onError: () => {
            toast.error("Error catch!");
            console.log("Error catch!");
        }
    });

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
        <form 
            key={id} 
            action={execute}
            className='w-full flex flex-row items-center justify-between'    
        >

            <InputModify 
                type="text"
                value={allState.family}
                onChange={(e)=> handleFamily(e)}
                placeholder={family} 
            />

            <InputModify 
                type="text"
                value={allState.name}
                onChange={(e)=> handleName(e)}
                placeholder={name} 
            />

            <InputModify 
                type="text"
                value={allState.stock}
                onChange={(e)=> handleStock(e)}
                placeholder={String(stock)} 
            />

            <InputModify 
                type="text"
                value={allState.price}
                onChange={(e)=> handlePrice(e)}
                placeholder={String(price)} 
            />

            <button 
                type="submit"
                className='flex items-center justify-center text-sm text-slate-50 bg-blue-500
                    transition transform duration-100 ease-in-out 
                    hover:bg-blue-500 active:bg-blue-600 px-6 py-2 rounded shadow-md
                    hover:scale-105 active:scale-95 active:shadow-in'
            >
                Save
            </button>

        </form>
    )
};
