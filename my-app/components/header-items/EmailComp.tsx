"use client";

import { EmailProps } from '@/lib/definitions';
import React, { useState } from 'react';
import Link from 'next/link';
import { MdMarkEmailRead } from "react-icons/md";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoIosMailOpen } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

export default function EmailComp({emailBox}: {emailBox: EmailProps[]}) {   

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const isEmailOpened: boolean = emailBox.every((email) => email.isOpen === true);

    return (
        <div 
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className='relative'
        >
            <span
                className='flex items-center transition duration-200 ease-in-out hover:text-slate-500'    
            >
                {isEmailOpened ? (
                    <MdMarkEmailRead size={18} />
                ) : (
                    <MdMarkEmailUnread size={18} />
                )}
            </span>

            {isOpen === true ? (
                <div  
                    className='absolute w-[130px] h-auto text-slate-500/90 bg-slate-200 mt-0 -ml-12
                        rounded-bl-md rounded-br-md'>
                    <Link href="/dashboard/emails-admin"
                        className='flex flex-row items-center w-auto cursor-pointer hover:text-slate-500 
                            hover:bg-slate-300 icon-hover-container px-2 py-2 mt-2'>
                        <IoIosMailOpen size={16} className='text-slate-500/70 icon-hover' />
                        <p className='text-sm mx-2'>
                            Read email
                        </p>
                    </Link>

                    <span 
                        /* onClick={() => setIsEmailBoxFill(!isEmailBoxFill)}  */
                        className='flex flex-row items-center w-auto cursor-pointer hover:text-slate-500 
                            hover:bg-slate-300 icon-hover-container px-2 py-2'>
                        <IoSettingsSharp size={16} className='text-slate-500/70 icon-hover' />
                        <p className='text-sm mx-2'>
                            Delete All
                        </p>
                    </span>

                    <span 
                        onClick={() => setIsOpen(false)}
                        className='flex flex-row items-center w-auto cursor-pointer hover:text-slate-500 
                            hover:bg-slate-300 icon-hover-container px-2 py-2'>
                        <IoIosCloseCircle size={16} className='text-slate-500/70 icon-hover' />
                        <p className='text-sm mx-2'>
                            Close
                        </p>
                    </span>

                </div>
            ) : null}
        </div>
    )
}
