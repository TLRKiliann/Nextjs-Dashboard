import React from 'react';
import Link from 'next/link';

export default function HeaderProducts() {
    return (
        <div className='absolute top-0 w-full h-[70px] text-slate-900 bg-slate-200'>
            <nav className="border w-full h-full">
                <ul className='w-full h-full flex flex-row items-center justify-end border'>

                    <li className='border mr-4'>
                        <Link href="/products">Home</Link>
                    </li>

                    <li className='border mr-4'>
                        <Link href="/products">Shop</Link>
                    </li>

                    <li className='border mr-4'>
                        <Link href="/">Contact</Link>
                    </li>

                    <li className='border mr-4'>
                        <Link href="/">Login</Link>
                    </li>

                    <li className='border mr-4'>
                        <Link href="/">Cart</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}
