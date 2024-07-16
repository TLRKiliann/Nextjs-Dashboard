"use client";

import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { createProduct } from '@/lib/actions';
import LblInputCreate from './lbl-input-create';

type AllProductsProps = {
    familyProduct: string | undefined;
    nameProduct: string | undefined;
    versionProduct: string | undefined;
    stockProduct: string | undefined;
    priceProduct: string | undefined;
};

export default function FormCreateContent() {

    // all state in one
    const [allProductStates, setAllProductStates] = useState<AllProductsProps>({
        familyProduct: undefined,
        nameProduct: undefined,
        versionProduct: undefined,
        stockProduct: undefined,
        priceProduct: undefined
    });

    /* const date: Date = new Date();
    console.log(date); */

    const handleFamilyProduct = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllProductStates((prev: AllProductsProps) => ({...prev, familyProduct: e.target.value}));
    };

    const handleNameProduct = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllProductStates((prev: AllProductsProps) => ({...prev, nameProduct: e.target.value}));
    };

    const handleVersion = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllProductStates((prev: AllProductsProps) => ({...prev, versionProduct: e.target.value}));
    };

    const handleStockProduct = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllProductStates((prev: AllProductsProps) => ({...prev, stockProduct: e.target.value}));
    };

    const handlePriceProduct = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllProductStates((prev: AllProductsProps) => ({...prev, priceProduct: e.target.value}));
    };

    const onSubmit = useCallback(async (formData: FormData) => {
        const res = await createProduct(formData);
        if (res.message === "Success!") {
            toast.success("Successfully created!")
        } else if (res.message === "There is an error!") {
            toast.error("Error catch during creation!")
        } else {
            toast.error("An unexpected error occurred.");
        }
        setAllProductStates((prev: AllProductsProps) => ({...prev, 
            familyProduct: "",
            nameProduct: "",
            versionProduct: "",
            stockProduct: "",
            priceProduct: ""
        }));
    }, []);
    
    return (
        <form action={onSubmit} className='flex flex-col items-center justify-center bg-slate-200 w-full h-[400px]'>

            <div className='flex items-center justify-center h-[20%] w-full'>
                <h2 className='text-xl lg:text-2xl xl:text-3xl font-bold text-center xl:mb-3'>
                    Create Product
                </h2>
            </div>

            <div className='flex flex-col justify-between w-full px-4'>

                <LblInputCreate
                    htmlFor="family"
                    type="text"
                    id="family"
                    name="family"
                    value={allProductStates?.familyProduct}
                    onChange={(e) => handleFamilyProduct(e)}
                >
                    Family of product :
                </LblInputCreate>

                <LblInputCreate
                    htmlFor="name"
                    type="text"
                    id="name"
                    name="name"
                    value={allProductStates?.nameProduct} 
                    onChange={(e) => handleNameProduct(e)} 
                >
                    Name of product :
                </LblInputCreate>

                <LblInputCreate
                    htmlFor="version"
                    type="text"
                    id="version"
                    name="version"
                    value={allProductStates?.versionProduct} 
                    onChange={(e) => handleVersion(e)}
                >
                    Ref or Version :
                </LblInputCreate>

                <LblInputCreate
                    htmlFor="stock"
                    type="text"
                    id="stock"
                    name="stock"
                    value={allProductStates?.stockProduct} 
                    onChange={(e) => handleStockProduct(e)}
                >
                    Stock of product :
                </LblInputCreate>

                <LblInputCreate
                    htmlFor="price"
                    type="text"
                    id="price"
                    name="price"
                    value={allProductStates?.priceProduct} 
                    onChange={(e) => handlePriceProduct(e)}
                >
                    Price of product :
                </LblInputCreate>

            </div>

            <div className='flex items-center justify-center w-full'>
                <input id="id" name="id" value={8} readOnly hidden />
                <button type="submit"
                    className='flex items-center justify-center w-full text-slate-50 font-bold 
                        bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded mx-4 mt-3 py-2'
                >
                    Validate
                </button>
            </div>
        </form>
    )
}
