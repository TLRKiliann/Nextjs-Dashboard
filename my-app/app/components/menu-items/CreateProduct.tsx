"use client";

import React, { useState } from 'react';

type AllProductsProps = {
    familyProduct: string;
    nameProduct: string;
    stockProduct: string;
    priceProduct: string;
};

export default function CreateProduct() {

    const [allProductStates, setAllProductStates] = useState<AllProductsProps>({
        familyProduct: "",
        nameProduct: "",
        stockProduct: "",
        priceProduct: ""
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

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = new FormData();
        const formData = form;

        const family = formData.get("family");
        const name = formData.get("name");
        const stock = formData.get("stock");
        const price = formData.get("price");
        console.log(family, name, stock, price, "formData");
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

                        <input type="text" id="stock" name="stock" value={allProductStates.stockProduct} 
                            onChange={(e) => handleStockProduct(e)} 
                            className='bg-slate-50 border border-slate-500/70 outline-none ring-none
                            focus:border focus:outline focus:ring focus:border-blue-400 focus:outline-blue-200 
                            focus:ring-blue-300 focus:bg-white rounded px-2 py-1'/>
                    </div>

                    <div className='flex flex-row items-start justify-between mb-3'>

                        <label className="text-lg mr-4" htmlFor="price">Price of product:</label>

                        <input type="text" id="price" name="price" value={allProductStates.priceProduct} 
                            onChange={(e) => handlePriceProduct(e)} 
                            className='bg-slate-50 border border-slate-500/70 outline-none ring-none
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
