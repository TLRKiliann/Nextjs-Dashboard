import { auth, signOut } from "@/auth";
import Link from 'next/link';
import { FaPowerOff } from "react-icons/fa6";
import AdminAccessLink from "./admin-access-link";
import Image from 'next/image';
import dashLogo from '@/public/assets/images/logo/dash-logo.png';

const HeaderAuth = async () => {
    
    const session = await auth();
    const user = session?.user;

    const logoutAction = async () => {
        'use server';
        await signOut({
            redirect: true,
            redirectTo: 'http://localhost:3000/login',
        });
    };

    return (
        <div className='fixed top-0 z-10 flex flex-row items-center justify-between w-full h-[60px] 
            bg-sky-200 pr-10'>
            <div className="ml-2 rounded">
                <Image 
                    src={dashLogo}
                    width={50}
                    height={50}
                    alt="no logo"
                    className="object-fit rounded"
                />
            </div>

            {!user ? (
                <div className="flex flex-row items-center space-between space-x-8">
                    <li className="list-none">
                        <Link href="/login">Login</Link>
                    </li>
                    <li className="list-none">
                        <Link href="/register">Register</Link>
                    </li>
                </div>
            ) : null}

            {user ? (
                <form action={logoutAction} className='flex flex-row items-center justify-center space-x-8'>
                    <li className="list-none">
                        <Link href="/">Home</Link>
                    </li>

                    <li className="list-none">
                        <Link href="/profile">Profile</Link>
                    </li>

                    <li className="list-none">
                        <Link href="/products">Products (user)</Link>
                    </li>

                    <AdminAccessLink />

                    <p className="text-blue-600">{user.name}</p>

                    <li className="relative flex list-none">
                        <button><FaPowerOff size={16} /></button>
                    </li>
                </form>
            ) : null}
        </div>
    )
}
export default HeaderAuth;