"use client";
//localhost:3000/dashboard/products
import { ProductsProps } from '@/app/lib/definitions';
import React, { useState } from 'react';
import Image from 'next/image';
import { products } from '@/app/lib/products';

type AllStateProps = {
    name: string;
    family: string;
    stock: string;
    price: string;
}

export default function Products() {

    const [listProducts, setListProducts] = useState<ProductsProps[]>(products);
    const [allState, setAllState] = useState<AllStateProps>(
        {
            name: "",
            family: "",
            stock: "",
            price: ""
        }
    );
    /* const handleAdd = (id: number) => {
        const findById: ProductsProps[] = listProducts.map((list: ProductsProps) => list.id === id 
            ? {...list, stock: list.stock - 1, quantity: list.quantity + 1} : list);
        setListProducts(findById);
    }; */
    
    /* const handleDelete = (id: number) => {
        const findById: ProductsProps[] = listProducts.map((list: ProductsProps) => list.id === id 
            ? {...list, stock: list.stock + 1, quantity: list.quantity - 1} : list);
        setListProducts(findById);
    }; */

    const handleFamily = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllState((prev) => ({...prev, family: e.target.value}));
    };

    const handleName = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setAllState((prev) => ({...prev, name: e.target.value}));
    };

    const handleStock = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setAllState((prev) => ({...prev, stock: prev.stock + 1}));
        setAllState((prev) => ({...prev, stock: e.target.value}));
    };

    const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setAllState((prev) => ({...prev, price: prev.price + 1}));
        setAllState((prev) => ({...prev, price: e.target.value}));
    };
    
    const handleModify = (id: number) => {
        const modifyById = listProducts.map((list: ProductsProps) => list.id === id 
            ? {...list, switch: !list.switch} : list);
        setListProducts(modifyById);
    };

    //derivated state
    const name: string = allState.name;
    const family: string = allState.family;
    const stock: string = allState.stock;
    const price: string = allState.price;

    const handleSave = (id: number): void => {
        const modifyById = listProducts.map((list: ProductsProps) => list.id === id 
            ? {...list, id: list.id, img: list.img, family: family, name: name, 
                stock: Number(stock), price: Number(price), quantity: list.quantity, switch: !list.switch} : list);
        setListProducts(modifyById);
    };

    const handleDelete = (id: number): void => {
        const findById: ProductsProps[] = listProducts.filter((list: ProductsProps) => list.id !== id);
        setListProducts(findById);
    };

    return (
        <div className='relative top-0 h-[60%] z-10'>
            
            <div className='flex flex-col items-center justify-center w-full h-[100%] 
                overflow-y-scroll no-scrollbar lg:pt-64 xl:pt-20'>

                {listProducts.map((product: ProductsProps) => (
                    <div key={product.id} 
                        className='flex flex-row items-center justify-between w-full h-[80px] bg-white 
                            rounded-lg shadow-sm-out p-2 m-2'>

                        <div className='w-[60px] h-[60px]'>
                            <Image 
                                src={product.img} 
                                width={100}
                                height={100}
                                className='w-[60px] h-[60px] object-fit rounded-lg shadow-sm-out'
                                alt="no img" 
                            />
                        </div>

                        {product.switch === false ? (
                            <>
                                <div className='w-1/5 flex flex-row items-center justify-center font-bold'>
                                    <h3>{product.family}</h3>
                                    <h4>&nbsp;{product.name}</h4>
                                </div>

                                <div className='w-2/5 flex flex-row items-center justify-around'>
                                    <p>Stock: {product.stock}</p>
                                    <p className='font-bold'>Price: {product.price}.-</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className='w-1/5 flex flex-row items-center justify-between font-bold'>
                                    <input type="text" value={allState.family} onChange={(e)=> handleFamily(e)} 
                                        placeholder={product.family} 
                                        className='w-2/5 bg-slate-50 border border-slate-500 outline-blue-500 
                                            focus:border-blue-500 focus:outline-none rounded-lg px-2 py-1'
                                    />
                                    <input type="text" value={allState.name} onChange={(e)=> handleName(e)} 
                                        placeholder={product.name} 
                                        className='w-2/5 bg-slate-50 border border-slate-500 outline-blue-500 
                                            focus:border-blue-500 focus:outline-none rounded-lg px-2 py-1'
                                    />
                                </div>

                                <div className='w-1/5 flex flex-row items-center justify-between'>
                                    <input type="text" value={allState.stock} onChange={(e) => handleStock(e)} 
                                        placeholder={String(product.stock)}
                                        className='w-2/5 bg-slate-50 border border-slate-500 outline-blue-500 
                                            focus:border-blue-500 focus:outline-none rounded-lg px-2 py-1'
                                    />
                                    <input type="text" value={allState.price} onChange={(e) => handlePrice(e)} 
                                        placeholder={String(product.price)} 
                                        className='w-2/5 bg-slate-50 border border-slate-500 outline-blue-500 
                                            focus:border-blue-500 focus:outline-none rounded-lg px-2 py-1'
                                    />
                                </div>
                            </>
                        )}

                        <p className='text-center w-1/5'>Quantity: {product.quantity}</p>

                        <div className='w-1/5 flex items-center justify-between'>
                            
                            {product.switch === false ? (
                                <button type="button" 
                                    onClick={() => handleModify(product.id)}
                                    className='text-slate-100 bg-blue-500 
                                    hover:bg-blue-600 active:bg-blue-700
                                    px-4 py-1 rounded shadow-sm-out'
                                >
                                    Modify
                                </button>
                            ) : (
                                <button type="button" 
                                    onClick={() => handleSave(product.id)}
                                    className='text-slate-100 bg-blue-500 
                                    hover:bg-blue-600 active:bg-blue-700
                                    px-4 py-1 rounded shadow-sm-out'
                                >
                                    Save
                                </button>
                            )}

                            <button type="button" 
                                onClick={() => handleDelete(product.id)}
                                className='text-slate-100 bg-blue-500 
                                hover:bg-blue-600 active:bg-blue-700
                                px-4 py-1 rounded shadow-sm-out ml-4'
                            >
                                Delete
                            </button>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}
