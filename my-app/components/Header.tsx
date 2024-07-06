import React from 'react';
import { auth, signOut } from '@/auth';
import Link from 'next/link';
import { FaPowerOff } from "react-icons/fa6";
import EmailComp from './header-items/EmailComp';
import Notifications from './header-items/Notifications';
import Searchbar from './header-items/Searchbar';

const Header = async () => {
    
    const session = await auth();
    const user = session?.user;
  
    const logoutAction = async () => {
        'use server';
        await signOut({redirect: false});
    };

    return (
        <div className='flex items-center justify-end w-full'>

            <nav className='w-full flex flex-col items-center'>
                
                <ul className='w-full flex items-center justify-end'>

                    <li className='flex items-center justify-center text-base text-slate-500/80 
                        transition duration-200 ease-in-out hover:text-slate-500'>
                        
                        <Searchbar />

                    </li>

                    <div className='flex items-center justify-evenly w-[200px]'>

                        <li className='flex items-center justify-center text-base text-slate-500/80 pl-4'>
                            <Notifications />
                        </li>

                        <li className='flex items-center justify-center text-base text-slate-500/80 px-4'>
                            <EmailComp />
                        </li>
                        {!user && (
                            <li className='flex items-center justify-center text-base text-slate-500/80 
                                transition duration-200 ease-in-out hover:text-slate-500'>
                                <Link href="/login">
                                    <FaPowerOff size={16} />
                                </Link>
                            </li>
                        )}
                        {user && (
                            <form action={logoutAction} className='flex pr-4'>
                                <li className='flex items-center justify-center text-base text-slate-500/80 
                                    transition duration-200 ease-in-out hover:text-slate-500'>
                                    <button>
                                        <FaPowerOff size={16} />
                                    </button>
                                </li>
                            </form>
                        )}
                    </div>
                </ul>
            </nav>
        </div>
    )
}
export default Header;