"use client";

import { User } from 'next-auth';
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


export default function CartProduct({ userCart, user }: { userCart: UserCartType; user: User }) {

    const [showBox, setShowBox] = useState(false);

    const handleShowCart = () => {
        setShowBox(!showBox);
    };

    return (
        <div className='w-full text-base text-slate-500'>

            <div className='text-start p-4 2xl:py-8'>
                <button 
                    type="button" 
                    onClick={handleShowCart} 
                    className='text-cyan-500 transition-colors transform duration-200 ease-in-out font-bold bg-gradient-to-tr from-cyan-600 to-cyan-950
                        hover:bg-gradient-to-tr hover:from-cyan-600 hover:text-slate-50 hover:to-cyan-900/70 hover:scale-105 hover:shadow-md
                        active:bg-gradient-to-tr active:from-cyan-700 active:to-cyan-950 active:text-cyan-600 active:scale-95 active:shadow-none 
                        px-4 py-1 rounded-full'
                >
                    Cart
                </button>
            </div>

            <div className='h-auto mt-1'>
                {showBox === true ? (
                    <div className='bg-gradient-to-tr from-slate-400/90 to-cyan-900/90 px-4 py-2 rounded-bl rounded-br'>
                        <h3 className='text-2xl font-serif text-slate-50 pt-1'>Cart items: <span className='text-sky-400'>{user.name}</span></h3>
                        {userCart.carts.map((cart) => cart.quantity !== 0 ? (
                            <div key={cart.name} className='w-full h-full flex flex-row items-center justify-between bg-white my-3 p-4 rounded shadow-sm-out'>
                                <p className='font-bold w-[100px]'>{cart.family}</p>
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
