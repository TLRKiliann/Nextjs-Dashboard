import { auth, signOut } from "@/auth";
import Link from 'next/link';
import prisma from "@/prisma/prisma";
//import { redirect } from "next/navigation";
import Image from 'next/image';
import AdminAccessLink from "./admin-access-link";
import { FaPowerOff } from "react-icons/fa6";
import dashLogo from '@/public/assets/images/logo/dash-logo.png';

const HeaderAuth = async () => {
    
    const session = await auth();
    const user = session?.user;

    const logoutAction = async () => {
        'use server';
        await prisma.user.update({
            data: {
                email: user?.email!,
                isConnected: false,
            },
            where: {
                email: user?.email!,
            }
        });
        await prisma.$disconnect();
        await signOut({
            redirect: true,
            redirectTo: 'http://localhost:3000/login',
        });
    };

    return (
        <div className='absolute top-0 z-10 flex flex-row items-center justify-between w-full h-[10vh] 
            text-base font-bold text-slate-50 bg-slate-50/30 shadow-auth pr-10'>
            <div className="ml-2 rounded">
                <Image 
                    src={dashLogo}
                    width={70}
                    height={50}
                    alt="no logo"
                    className="w-[60px] h-auto object-cover rounded"
                />
            </div>

            {!user ? (
                <div className="flex flex-row items-center space-between space-x-8">
                    <li className="list-none transform duration-200 ease-in-out hover:text-cyan-200 active:text-cyan-100">
                        <Link href="/login">Login</Link>
                    </li>
                    <li className="list-none transform duration-200 ease-in-out hover:text-cyan-200 active:text-cyan-100">
                        <Link href="/register">Register</Link>
                    </li>
                </div>
            ) : null}

            {user ? (
                <form action={logoutAction} className='flex flex-row items-center justify-center space-x-8'>
                    <li className="list-none transform duration-200 ease-in-out hover:text-cyan-200 active:text-cyan-100">
                        <Link href="/">Home</Link>
                    </li>

                    <li className="list-none transform duration-200 ease-in-out hover:text-cyan-200 active:text-cyan-100">
                        <Link href="/profile">Profile</Link>
                    </li>

                    <li className="list-none transform duration-200 ease-in-out hover:text-cyan-200 active:text-cyan-100">
                        <Link href="/products">Products (user)</Link>
                    </li>

                    <AdminAccessLink />

                    <p className="text-blue-600/80">{user.name}</p>

                    <li className="relative flex list-none transform duration-200 ease-in-out hover:text-cyan-200 active:text-cyan-100">
                        <button><FaPowerOff size={16} /></button>
                    </li>
                </form>
            ) : null}
        </div>
    )
}
export default HeaderAuth;