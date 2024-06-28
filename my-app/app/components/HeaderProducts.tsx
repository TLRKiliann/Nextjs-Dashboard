import React from 'react';
import Link from 'next/link';
import { FaShoppingCart } from "react-icons/fa";

export default function HeaderProducts() {
    return (
        <div className='absolute top-0 w-full h-[70px] text-slate-900 bg-slate-200 
            transition duration-300 ease-in-out opacity-0 hover:opacity-100'>
            <nav className="w-full h-full">
                <ul className='w-full h-full flex flex-row items-center justify-end'>

                    <li className='mr-4'>
                        <Link href="/">Home</Link>
                    </li>

                    <li className='mr-4'>
                        <Link href="/products">Shop</Link>
                    </li>

                    <li className='mr-4'>
                        <Link href="/">Contact</Link>
                    </li>

                    <li className='mr-4'>
                        <Link href="/login">Login</Link>
                    </li>

                    <li className='mr-6'>
                        <Link href="/cart">
                            <FaShoppingCart size={18} />
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
