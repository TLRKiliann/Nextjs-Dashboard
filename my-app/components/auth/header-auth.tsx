import { auth, signOut } from "@/auth";
import Link from 'next/link';

export const dynamic = "force-dynamic";

const HeaderAuth = async () => {

    const session = await auth();

    const logoutAction = async () => {
        'use server';
        await signOut();
    };

    const user = session?.user;

    return (
        <div className='fixed top-0 z-10 flex flex-row items-center justify-end w-full h-[60px] bg-sky-200 space-x-10 pr-6'>

            {user && (
                <form action={logoutAction} className='flex space-x-10'>
                    <li className="list-none">
                        <Link href="/profile">Profile</Link>
                    </li>

                    <li className="list-none">
                        <Link href="/products">Products</Link>
                    </li>

                    <li className="list-none">
                        <button>Logout</button>
                    </li>
                </form>
            )}

            {!user && (
                <>
                    <li className="list-none">
                        <Link href="/login">Login</Link>
                    </li>
                    <li className="list-none">
                        <Link href="/register">Register</Link>
                    </li>
                </>
            )}

            <li className="list-none">
                <Link href="/dashboard/dashboardnative">Dashboard (admin)</Link>
            </li>

        </div>
    )
}
export default HeaderAuth;