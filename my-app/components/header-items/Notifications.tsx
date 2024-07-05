"use client";

import React, { useState } from 'react';
import { BiSolidBellRing } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa6";
import { IoReaderSharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

export default function Notifications() {

    const [isOpenRing, setIsOpenRing] = useState<boolean>(false);
    const [isRingBell, setIsRingBell] = useState<boolean>(false);

    return (
        <div 
            onMouseEnter={() => setIsOpenRing(true)}
            onMouseLeave={() => setIsOpenRing(false)} 
            className='relative'>

            <div 
                className='flex items-center transition duration-200 ease-in-out hover:text-slate-500'    
            >
                {isRingBell === false ? (
                    <BiSolidBellRing size={18} />
                ) : (
                    <FaRegBell size={18} />
                )}
            </div>

            {isOpenRing === true ? (
                
                <div 
                    className='absolute z-40 w-[130px] h-auto text-slate-500/90 bg-slate-200 mt-0 -ml-12
                        rounded-bl-md rounded-br-md'>

                    <span onClick={() => setIsOpenRing(false)} 
                        className='flex flex-row items-center w-auto cursor-pointer hover:text-slate-500 
                            hover:bg-slate-300 icon-hover-container px-2 py-2'>
                        <IoReaderSharp size={16} className='text-slate-500/70 icon-hover' />
                        <p className='text-sm mx-2'>
                            Read notes
                        </p>
                    </span>

                    <span onClick={() => setIsRingBell(!isRingBell)} 
                        className='flex flex-row items-center w-auto cursor-pointer hover:text-slate-500 
                            hover:bg-slate-300 icon-hover-container px-2 py-2'>
                        <IoSettingsSharp size={16} className='text-slate-500/70 icon-hover' />
                        <p className='text-sm mx-2'>
                            Settings
                        </p>
                    </span>

                    <span onClick={() => setIsOpenRing(false)}
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
