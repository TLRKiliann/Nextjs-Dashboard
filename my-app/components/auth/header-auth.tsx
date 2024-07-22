import { auth, signOut } from "@/auth";
import Link from 'next/link';
import { PrismaClient } from "@prisma/client";
import Image from 'next/image';
import AdminAccessLink from "./admin-access-link";
import { FaPowerOff } from "react-icons/fa6";
import dashLogo from '@/public/assets/images/logo/dash-logo.png';

const prisma = new PrismaClient();

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
        <div className='absolute top-0 z-10 flex flex-row items-center justify-between w-full h-[60px] 
            bg-sky-200 pr-10'>
            <div className="ml-2 rounded">
                <Image 
                    src={dashLogo}
                    width={70}
                    height={50}
                    alt="no logo"
                    className="w-[50px] h-auto object-fit rounded"
                />
            </div>

            {!user ? (
                <div className="flex flex-row items-center space-between space-x-8">
                    <li className="list-none hover:text-indigo-500 active:text-indigo-400">
                        <Link href="/login">Login</Link>
                    </li>
                    <li className="list-none hover:text-indigo-500 active:text-indigo-400">
                        <Link href="/register">Register</Link>
                    </li>
                </div>
            ) : null}

            {user ? (
                <form action={logoutAction} className='flex flex-row items-center justify-center space-x-8'>
                    <li className="list-none hover:text-indigo-500 active:text-indigo-400">
                        <Link href="/">Home</Link>
                    </li>

                    <li className="list-none hover:text-indigo-500 active:text-indigo-400">
                        <Link href="/profile">Profile</Link>
                    </li>

                    <li className="list-none hover:text-indigo-500 active:text-indigo-400">
                        <Link href="/products">Products (user)</Link>
                    </li>

                    <AdminAccessLink />

                    <p className="text-purple-500">{user.name}</p>

                    <li className="relative flex list-none hover:text-indigo-500 active:text-indigo-400">
                        <button><FaPowerOff size={16} /></button>
                    </li>
                </form>
            ) : null}
        </div>
    )
}
export default HeaderAuth;