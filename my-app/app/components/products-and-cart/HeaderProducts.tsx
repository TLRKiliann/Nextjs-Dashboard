import React from 'react';
import Link from 'next/link';
import { FaShoppingCart } from "react-icons/fa";
import CartItemsQuantity from './CartItemsQuantity';

export default function HeaderProducts() {
    return (
        <div className='fixed top-0 w-full h-[70px] text-slate-700/90 bg-slate-200 
            transition duration-300 ease-in-out opacity-100 hover:opacity-100'>
            <nav className="w-full h-full">
                <ul className='w-full h-full flex flex-row items-center justify-end'>

                    <li className='mr-6'>
                        <Link href="/">Home</Link>
                    </li>

                    <li className='mr-6'>
                        <Link href="/products">Shop</Link>
                    </li>

                    <li className='mr-6'>
                        <Link href="/">Contact</Link>
                    </li>

                    <li className='mr-4'>
                        <Link href="/login">Login</Link>
                    </li>

                    <li className='relative flex items-center justify-center w-[40px] h-[40px] 
                    transform duration-100 ease-in-out hover:scale-105 active:scale-95
                        hover:text-white hover:bg-blue-200 active:text-slate-200 active:bg-blue-300
                        rounded-full mr-8'>
                        <Link href="/products/cart" className=''>
                            <FaShoppingCart size={18}/>
                            <CartItemsQuantity />
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
