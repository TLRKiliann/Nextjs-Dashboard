import React from 'react';
import { auth, signOut } from '@/auth';
import Link from 'next/link';
import { FaSearch } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import EmailComp from './header-items/EmailComp';
import Notifications from './header-items/Notifications';

const Header = async () => {
    const session = await auth();
    const user = session?.user;
  
    const logoutAction = async () => {
        'use server';
        await signOut();
    };

    return (
        <div className='flex items-center justify-end w-full'>

            <nav className='w-full flex flex-col items-center'>
                
                <ul className='w-full flex items-center justify-end'>

                    <li className='flex items-center justify-center text-base text-slate-500/80 
                        transition duration-200 ease-in-out hover:text-slate-500'>
                        
                        <div className='relative w-full z-10 border border-slate-200'>
    
                            <FaSearch className='absolute my-2 ml-2 z-20' size={18} />

                            <input type="text"
                                className='w-[200px] text-base border bg-slate-50 
                                    focus:w-[500px] focus:ring-1 focus:ring-blue-500 focus:border-none 
                                    focus:outline-none focus:text-slate-600 shadow-inner rounded-full pl-8 py-1'
                                placeholder="Search"
                            />

                        </div>

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