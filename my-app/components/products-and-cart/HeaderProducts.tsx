import { auth, signOut } from "@/auth";
import React from 'react';
import { redirect } from "next/navigation";
import Link from 'next/link';
import { FaShoppingCart } from "react-icons/fa";
import CartItemsQuantity from './CartItemsQuantity';

const HeaderProducts = async () => {

    const session = await auth();

    if (!session?.user) {
        return redirect("/api/auth/signin");
    }
    const user = session?.user;

    const logoutAction = async () => {
        'use server';
        await signOut();
    };

    return (
        <div className='fixed z-20 top-0 w-full h-[70px] text-slate-700/90 bg-slate-200 
            transition duration-300 ease-in-out opacity-0 hover:opacity-100'>
            <nav className="w-full h-full">
                <ul className='w-full h-full flex flex-row items-center justify-end'>

                    <li className='hover:text-blue-500 active:text-blue-600 mr-6'>
                        <Link href="/">Home</Link>
                    </li>

                    <li className='hover:text-blue-500 active:text-blue-600 mr-6'>
                        <Link href="/products">Shop</Link>
                    </li>

                    <li className='hover:text-blue-500 active:text-blue-600 mr-6'>
                        <Link href="/contact">Contact</Link>
                    </li>

                    {!user && (
                        <li className='hover:text-blue-500 active:text-blue-600 mr-4'>
                            <Link href="/login">Login</Link>
                        </li>
                    )}

                    {user && (
                        <form action={logoutAction}>
                            <li className='hover:text-blue-500 active:text-blue-600 mr-4'>
                                <button>Logout</button>
                            </li>
                        </form>
                    )}

                    <li className='relative flex items-center justify-center w-[40px] h-[40px] 
                        transform duration-200 ease-in-out
                        hover:text-white hover:bg-blue-200 active:text-slate-200 active:bg-blue-300
                        rounded-full mr-8'>
                        <Link href="/products/cart">
                            <FaShoppingCart size={18}/>
                            <CartItemsQuantity />
                        </Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
export default HeaderProducts;