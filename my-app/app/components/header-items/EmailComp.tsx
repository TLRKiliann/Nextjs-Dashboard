"use client";

import React, { useState } from 'react';
import { MdMarkEmailRead } from "react-icons/md";
import { MdMarkEmailUnread } from "react-icons/md";
import { IoIosMailOpen } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

export default function EmailComp() {   

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEmailBoxFill, setIsEmailBoxFill] = useState<boolean>(true);

    return (
        <div className='relative'>

            <button type="button" onClick={() => setIsOpen(!isOpen)}
                className='flex items-center transition duration-200 ease-in-out hover:text-slate-500'    
            >
                {isEmailBoxFill === false ? (
                    <MdMarkEmailRead size={18} />
                ) : (
                    <MdMarkEmailUnread size={18} />
                )}
            </button>

            {isOpen === true ? (
                
                <div className='absolute w-[140px] p-0 h-auto text-slate-500/90 bg-slate-200 mt-2 -ml-14
                    rounded-bl-md rounded-br-md'>

                    <span onClick={() => setIsOpen(false)} 
                        className='flex flex-row items-center w-auto cursor-pointer hover:text-slate-500 hover:bg-slate-300 icon-hover-container px-2 py-1'>
                        <IoIosMailOpen size={16} className='text-slate-500/70 icon-hover' />
                        <p className='text-sm mx-2'>
                            Read email
                        </p>
                    </span>

                    <span onClick={() => setIsOpen(false)} 
                        className='flex flex-row items-center w-auto cursor-pointer hover:text-slate-500 hover:bg-slate-300 icon-hover-container px-2 py-1'>
                        <IoSettingsSharp size={16} className='text-slate-500/70 icon-hover' />
                        <p className='text-sm mx-2'>
                            Settings
                        </p>
                    </span>

                    <span onClick={() => setIsOpen(false)}
                        className='flex flex-row items-center w-auto cursor-pointer hover:text-slate-500 hover:bg-slate-300 icon-hover-container px-2 py-1'>
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
