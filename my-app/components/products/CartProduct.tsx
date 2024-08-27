"use client";

import React, { useState } from 'react';

type ProductType = {
    family: string;
    name: string;
    quantity: number;
    price: number;
  };
  
type UserCartType = {
    id: string;
    carts: ProductType[];
};


export default function CartProduct({ userCart }: { userCart: UserCartType }) {

    const [showBox, setShowBox] = useState(false);

    const handleShowCart = () => {
        setShowBox(!showBox);
    };

    return (
        <div className='w-full text-base font-bold text-slate-500'>

            <div className='text-end p-2'>
                <button 
                    type="button" 
                    onClick={handleShowCart} 
                    className='text-sm text-slate-50 bg-gradient-to-tr from-slate-400 to-cyan-900 hover:bg-cyan-700 w-[30px] h-[30px] rounded-full'
                >
                    X
                </button>
            </div>

            <div className='h-auto'>
                {showBox === true ? (
                    <div className='bg-gradient-to-tr from-slate-400/90 to-cyan-900/90 px-4 py-2 rounded'>
                    {userCart.carts.map((cart) => cart.quantity !== 0 ? (
                        <div key={cart.name} className='w-full h-full flex flex-row items-center justify-between bg-slate-50 my-3 p-4 rounded'>
                            <p className='w-[100px]'>{cart.family}</p>
                            <p className='w-[100px] text-center'>{cart.name}</p>
                            <p className='w-[100px] text-center'>{cart.quantity}x</p>
                            <p className='w-[100px] text-end'>{cart.price}.-</p>
                        </div>
                        ) : null
                    )}
                    </div>
                ) : null}
            </div>

        </div>
    )
};
