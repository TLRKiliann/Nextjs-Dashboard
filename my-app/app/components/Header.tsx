"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaSearch } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa6";
import { BiSolidBellRing } from "react-icons/bi";

export default function Header() {

    const [ringBell, setRingBell] = useState<boolean>(false);
    const [email, setEmail] = useState<boolean>(false);
    
    return (
        <div className='flex items-center justify-end w-full pr-8'>

            <nav className='flex flex-col items-center w-[350px]'>
                
                <ul className='w-full flex items-center justify-between'>

                    <li className='flex items-center justify-center text-base text-slate-500/80 
                        transition duration-200 ease-in-out hover:text-slate-500'>
                        
                        <div className='relative w-full'>
    
                            <FaSearch className='absolute my-2 ml-2 z-20' size={18} />

                            <input type="text"
                            className='w-[200px] text-base border pl-8 py-1
                                bg-slate-50
                                focus:absolute focus:z-10 focus:w-[300px]
                                focus:ring-1 focus:ring-blue-500 focus:border-none
                                focus:outline-none
                                focus:text-slate-600
                                shadow-inner rounded-full'
                            />

                        </div>

                    </li>
                    <li className='flex items-center justify-center text-base text-slate-500/80 
                        transition duration-200 ease-in-out hover:text-slate-500'>
                        <button type="button" onClick={() => setRingBell(!ringBell)}>
                            {ringBell === true ? (
                                <BiSolidBellRing size={16}/>
                            ) : (
                                <FaRegBell size={16} />
                            )}
                        </button>
                    </li>

                    <li className='flex items-center justify-center text-base text-slate-500/80 
                        transition duration-200 ease-in-out hover:text-slate-500'>
                        <button type="button" onClick={() => setEmail(!email)}>
                            {email === false ? (
                                <MdMarkEmailRead size={18} />
                            ) : (
                                <MdMarkEmailUnread size={18} />
                            )}
                        </button>
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
