import { auth, signOut } from "@/auth";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import Link from 'next/link';
import CartItemsQuantity from '../cart/CartItemsQuantity';
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
        <div className="fixed z-20 top-0 w-full h-[10vh] text-lg font-bold text-slate-100 
            bg-gradient-to-l from-cyan-950 to-cyan-800 shadow-md">

            <nav className="w-full h-full flex items-center justify-end">
                <ul className='w-[450px] h-full flex flex-row items-center justify-evenly'>

                    <li className='transition-colors duration-200 ease-in-out hover:text-cyan-600 active:text-cyan-700'>
                        <Link href="/">Home</Link>
                    </li>

                    <li className='transition-colors duration-200 ease-in-out hover:text-cyan-600 active:text-cyan-700'>
                        <Link href="/products">Shop</Link>
                    </li>

                    <li className='transition-colors duration-200 ease-in-out hover:text-cyan-600 active:text-cyan-700'>
                        <Link href="/contact">Contact</Link>
                    </li>

                    <li className="list-none mr-2">
                        <Link href="/cart" className='relative flex items-center justify-center w-[40px] h-[40px] transform 
                        duration-200 ease-in-out hover:scale-105 hover:text-white hover:bg-sky-500
                        active:bg-cyan-500/70 active:scale-95 rounded-full'>
                            <FaShoppingCart className="transform duration-100 ease-in-out group-hover:scale-105" size={18} />
                            <CartItemsQuantity />
                        </Link>
                    </li>

                    {user && (
                        <form title="logout" action={logoutAction}>
                            <li className='flex items-center transition-colors duration-200 ease-in-out hover:text-cyan-600 active:text-cyan-700'>
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