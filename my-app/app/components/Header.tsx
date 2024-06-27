import React from 'react';
import Link from 'next/link';
import { FaSearch } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import EmailComp from './header-items/EmailComp';
import Notifications from './header-items/Notifications';

export default function Header() {
    return (
        <div className='flex items-center justify-end w-full pr-8'>

            <nav className='flex flex-col items-center w-[350px]'>
                
                <ul className='w-full flex items-center justify-between'>

                    <li className='flex items-center justify-center text-base text-slate-500/80 
                        transition duration-200 ease-in-out hover:text-slate-500'>
                        
                        <div className='relative w-full'>
    
                            <FaSearch className='absolute my-2 ml-2 z-20' size={18} />

                            <input type="text"
                                className='w-[200px] text-base border pl-8 py-1 bg-slate-50 focus:absolute 
                                    focus:z-10 focus:w-[300px] focus:ring-1 focus:ring-blue-500 focus:border-none 
                                    focus:outline-none focus:text-slate-600 shadow-inner rounded-full'
                            />

                        </div>

                    </li>
                    
                    <li className='flex items-center justify-center text-base text-slate-500/80'>
                        <Notifications />
                    </li>

                    <li className='flex items-center justify-center text-base text-slate-500/80'>
                        <EmailComp />
                    </li>

                    <li className='flex items-center justify-center text-base text-slate-500/80 
                        transition duration-200 ease-in-out hover:text-slate-500'>
                        <Link href="/">
                            <FaPowerOff size={16} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
