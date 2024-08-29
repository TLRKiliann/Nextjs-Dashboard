"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import AdminAccessLink from "./admin-access-link";
import dashLogo from '@/public/assets/images/logo/dash-logo.png';
import { FaPowerOff } from "react-icons/fa6";

const HeaderAuth = (): JSX.Element => {
    
    const {data: session} = useSession();
    const user = session?.user;

    const logoutAction = async () => {
        const response = await fetch("/api/auth/logout", {
            method: 'POST',
        });
        if (response.ok) {
            console.log("logout is ok");
            signOut({
                redirect: true,
                callbackUrl: "/login"
            })
        } else {
            const data = await response.json();
            console.error(data.message);
        }
    };

    return (
        <div className='absolute top-0 z-10 flex flex-row items-center justify-between w-full h-[70px] 
            text-lg font-semibold text-slate-50 bg-gradient-to-l from-cyan-500 to-blue-500/50 
            shadow-sm-out pr-10'
        >
            <div className="ml-2 rounded">
                <Image 
                    src={dashLogo}
                    priority={true}
                    width={70}
                    height={50}
                    alt="no logo"
                    className="w-[60px] h-auto object-cover rounded"
                />
            </div>

            {!user ? (
                <div className="flex flex-row items-center space-between space-x-8">
                    <li className="drop-shadow-sm-text list-none transition duration-300 ease-in-out hover:drop-shadow-none active:text-cyan-400 active:drop-shadow-none active:scale-95">
                        <Link href="/login">Login</Link>
                    </li>
                    <li className="drop-shadow-sm-text list-none transition duration-300 ease-in-out hover:drop-shadow-none active:text-cyan-400 active:drop-shadow-none active:scale-95">
                        <Link href="/register">Register</Link>
                    </li>
                </div>
            ) : null}

            {user ? (
                <div className='flex flex-row items-center justify-center space-x-8'>
                    <li className="drop-shadow-sm-text list-none transition duration-300 ease-in-out hover:drop-shadow-none active:text-cyan-400 active:drop-shadow-none active:scale-95">
                        <Link href="/">Home</Link>
                    </li>

                    <li className="drop-shadow-sm-text list-none transition duration-300 ease-in-out hover:drop-shadow-none active:text-cyan-400 active:drop-shadow-none active:scale-95">
                        <Link href="/profile">Profile</Link>
                    </li>

                    <li className="drop-shadow-sm-text list-none transition duration-300 ease-in-out hover:drop-shadow-none active:text-cyan-400 active:drop-shadow-none active:scale-95">
                        <Link href="/products">Products</Link>
                    </li>

                    <AdminAccessLink user={user} />

                    <p className='drop-shadow-sm-text'>{user.name}</p>

                    <form action={logoutAction} className="relative flex">
                        <button type="submit"><FaPowerOff size={16} className='drop-shadow-sm-text transition duration-300 ease-in-out hover:drop-shadow-none active:text-cyan-400 active:drop-shadow-none active:scale-95' /></button>
                    </form>
                </div>
            ) : null}
        </div>
    )
}
export default HeaderAuth;