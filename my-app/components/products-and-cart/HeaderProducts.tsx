import { auth, signOut } from "@/auth";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import Link from 'next/link';
import CartItemsQuantity from './CartItemsQuantity';
import { FaPowerOff, FaShoppingCart } from "react-icons/fa";

const HeaderProducts = async () => {

    const session = await auth();
    const user = session?.user;

    if (!user?.id) {
        return redirect("/api/auth/signin");
    };

    const logoutAction = async () => {
        'use server';
        await prisma.user.update({
            data: {
                id: user.id,
                isConnected: false,
            },
            where: {
                id: user.id,
            }
        });
        await prisma.$disconnect();
        await signOut({
            redirect: true,
            redirectTo: 'http://localhost:3000/login',
        });
    };

    return (
        <div className="fixed z-20 top-0 w-full h-[10vh] text-lg font-bold text-slate-600/70 bg-white border-none shadow-md">
            <nav className="w-full h-full">
                <ul className='w-full h-full flex flex-row items-center justify-end'>

                    <li className='transform duration-200 ease-in-out hover:text-gray-600/80 active:text-gray-400 mr-6'>
                        <Link href="/">Home</Link>
                    </li>

                    <li className='transform duration-200 ease-in-out hover:text-gray-600/80 active:text-gray-400 mr-6'>
                        <Link href="/products">Shop</Link>
                    </li>

                    <li className='transform duration-200 ease-in-out hover:text-gray-600/80 active:text-gray-400 mr-4'>
                        <Link href="/contact">Contact</Link>
                    </li>

                    <li className='relative flex items-center justify-center w-[40px] h-[40px] transform 
                        duration-200 ease-in-out hover:text-white hover:bg-blue-200 
                        active:bg-blue-400 rounded-full mr-6'>
                        <Link href="/products/cart">
                            <FaShoppingCart size={18}/>
                            <CartItemsQuantity />
                        </Link>
                    </li>

                    {user && (
                        <form title="logout" action={logoutAction}>
                            <li className='flex items-center transform duration-200 ease-in-out hover:text-gray-600/80 active:text-gray-400 mr-8'>
                                <button><FaPowerOff size={16} /></button>
                            </li>
                        </form>
                    )}

                </ul>
            </nav>
        </div>
    )
}
export default HeaderProducts;