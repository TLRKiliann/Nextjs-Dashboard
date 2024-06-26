"use client";

import { ProductsProps } from '@/app/lib/definitions';
import { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import { useStore } from '@/app/lib/store';
import usePersistStore from '@/app/helpers/usePersistStore';
import logo from "@/public/assets/images/cpu/cpu_i3.jpg";

type AllProductsProps = {
    familyProduct: string | undefined;
    nameProduct: string | undefined;
    stockProduct: string | undefined;
    priceProduct: string | undefined;
};

export default function CreateProduct() {

    const store = usePersistStore(useStore, (state) => state);

    // all state in one
    const [allProductStates, setAllProductStates] = useState<AllProductsProps>({
        familyProduct: undefined,
        nameProduct: undefined,
        stockProduct: undefined,
        priceProduct: undefined
    });

    const handleFamilyProduct = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllProductStates((prev) => ({...prev, familyProduct: e.target.value}));
    };

    const handleNameProduct = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllProductStates((prev) => ({...prev, nameProduct: e.target.value}));
    };

    const handleStockProduct = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllProductStates((prev) => ({...prev, stockProduct: e.target.value}));
    };

    const handlePriceProduct = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllProductStates((prev) => ({...prev, priceProduct: e.target.value}));
    };

    // db simulation
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const family: string = formData.get("family") as string;
        const name: string = formData.get("name") as string;
        const stock: number = Number(formData.get("stock"));
        const price: number = Number(formData.get("price"));

        //console.log(family, name, stock, price, "formData");
        
        const img: StaticImageData = logo; 
        
        const version: string = generateVersion();
        const nbArtSold: number = 0;
        const switcher: boolean = false;
        
        // to store in zustand
        const newProduct: ProductsProps = {
            id: Math.floor(Math.random() * 10000),
            family,
            img,
            name,
            version,
            stock,
            price,
            nbArtSold,
            switcher: switcher,
        };
        store?.addProducts([newProduct]);

        // reinitialize state
        setAllProductStates((prev) => ({...prev, 
            nameProduct: undefined, 
            familyProduct: undefined,
            stockProduct: undefined,
            priceProduct: undefined
        }));
    };

    return (
        <div className='flex flex-col justify-center h-[40%] bg-slate-200'>

            <div className='h-full flex flex-col items-center justify-center m-4'>

                <form onSubmit={(e) => handleSubmit(e)} className='w-[420px] h-full rounded-lg'>
    
                    <h2 className='text-lg font-bold text-center m-auto py-4'>Create Product</h2>
    
                    <div className='flex flex-row items-start justify-between mb-3'>
                        <label className="text-lg mr-4" htmlFor="family">Family of product:</label>
                        <input type="text" id="family" name="family" value={allProductStates.familyProduct} 
                            onChange={(e) => handleFamilyProduct(e)} 
                            className='bg-slate-50 border border-slate-500/70 outline-none ring-none
                            focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                            focus:ring-blue-300 focus:bg-white rounded px-2 py-1'/>
                    </div>

                    <div className='flex flex-row items-start justify-between mb-3'>
                        <label className="text-lg mr-4" htmlFor="name">Name of product:</label>
                        <input type="text" id="name" name="name" value={allProductStates.nameProduct} 
                            onChange={(e) => handleNameProduct(e)} 
                            className='bg-slate-50 border border-slate-500/70 outline-none ring-none
                            focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                            focus:ring-blue-300 focus:bg-white rounded px-2 py-1'/>
                    </div>

                    <div className='flex flex-row items-start justify-between mb-3'>
                        <label className="text-lg mr-4" htmlFor="stock">Stock of product:</label>
                        <input type="number" id="stock" name="stock" value={allProductStates.stockProduct} 
                            onChange={(e) => handleStockProduct(e)} 
                            className='no-spin bg-slate-50 border border-slate-500/70 outline-none ring-none
                            focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                            focus:ring-blue-300 focus:bg-white rounded px-2 py-1'/>
                    </div>

                    <div className='flex flex-row items-start justify-between mb-3'>
                        <label className="text-lg mr-4" htmlFor="price">Price of product:</label>
                        <input type="number" id="price" name="price" value={allProductStates.priceProduct} 
                            onChange={(e) => handlePriceProduct(e)} 
                            className='no-spin bg-slate-50 border border-slate-500/70 outline-none ring-none
                            focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                            focus:ring-blue-300 focus:bg-white rounded px-2 py-1'/>
                    </div>

                    <div className='flex items-center justify-center mt-4'>
                        <button type="submit"
                            className='text-slate-100 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded px-4 py-1'
                        >
                            Validate
                        </button>
                    </div>

                </form>

            </div>
        </div>
    )
}
