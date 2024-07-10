import { auth, signOut } from "@/auth";
import Link from 'next/link';
import { FaPowerOff } from "react-icons/fa6";

export const dynamic = "force-dynamic";

const HeaderAuth = async () => {
    
    const session = await auth();

    const logoutAction = async () => {
        'use server';
        await signOut();
    };

    const user = session?.user?.name;

    return (
        <div className='fixed top-0 z-10 flex flex-row items-center justify-end w-full h-[60px] bg-sky-200 
            pr-10'>

            {!user ? (
                <div className="w-[140px] flex items-center justify-between">
                    <li className="list-none">
                        <Link href="/login">Login</Link>
                    </li>
                    <li className="list-none">
                        <Link href="/register">Register</Link>
                    </li>
                </div>
            ) : null}

            {user === "Admin User" ? (
                <li className="list-none">
                    <Link href="/dashboard/dashboardnative">Dashboard (admin)</Link>
                </li>
            ) : null}

            {user !== undefined ? (
                <form action={logoutAction} className='flex space-x-8'>
                    <li className="list-none">
                        <Link href="/profile">Profile</Link>
                    </li>

                    <li className="list-none">
                        <Link href="/products">Products (user)</Link>
                    </li>

                    <p className="text-blue-500">{user}</p>

                    <li className="relative flex list-none">
                        <button><FaPowerOff size={16} /></button>
                    </li>
                </form>
            ) : null}

        </div>
    )
}
export default HeaderAuth;