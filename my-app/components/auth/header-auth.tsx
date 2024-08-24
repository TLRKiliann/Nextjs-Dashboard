"use client";

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import AdminAccessLink from "./admin-access-link";
import { FaPowerOff } from "react-icons/fa6";
import dashLogo from '@/public/assets/images/logo/dash-logo.png';

const HeaderAuth = (): JSX.Element => {
    
    const { data: session } = useSession();
    const user = session?.user;

    const logoutAction = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        await signOut({ 
            redirect: true, 
            callbackUrl: '/login' 
        });
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
                    <li className="list-none transition-colors hover:text-cyan-200 active:text-cyan-300">
                        <Link href="/login">Login</Link>
                    </li>
                    <li className="list-none transition-colors hover:text-cyan-200 active:text-cyan-300">
                        <Link href="/register">Register</Link>
                    </li>
                </div>
            ) : null}

            {user ? (
                <form onSubmit={logoutAction} className='flex flex-row items-center justify-center space-x-8'>
                    <li className="list-none transition-colors hover:text-cyan-200 active:text-cyan-300">
                        <Link href="/">Home</Link>
                    </li>

                    <li className="list-none transition-colors hover:text-cyan-200 active:text-cyan-300">
                        <Link href="/profile">Profile</Link>
                    </li>

                    <li className="list-none transition-colors hover:text-cyan-200 active:text-cyan-300">
                        <Link href="/products">Products (user)</Link>
                    </li>

                    <AdminAccessLink user={user} />

                    <p>{user.name}</p>

                    <li className="relative flex list-none transition-colors hover:text-cyan-200 active:text-cyan-300">
                        <button type="submit"><FaPowerOff size={16} /></button>
                    </li>
                </form>
            ) : null}
        </div>
    )
}
export default HeaderAuth;