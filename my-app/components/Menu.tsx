import Link from 'next/link';
import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaChartColumn } from "react-icons/fa6";
import { BsClipboardDataFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";

import { FaProductHunt } from "react-icons/fa6";
import { IoChatbubblesOutline } from "react-icons/io5";
import { TbCircleLetterB } from "react-icons/tb";

export default function Menu() {
    return (
        <div className='flex flex-col items-center justify-start w-auto h-full text-slate-500'>
            
            <h2 className='w-full text-lg text-center text-slate-400/70 mt-5'>
                Dashboard
            </h2>
            
            <nav className="flex items-center justify-center h-full">

                <ul className='my-8'>
                    <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                        <Link href="/dashboard/dashboardnative">
                            <span className='flex items-center'>
                                <FaHome size={18} /><p className='ml-2'>Overview</p>
                            </span>
                        </Link>
                    </li>

                    <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                        <Link href="/products">
                            <span className='flex items-center'>
                                <FaCartShopping size={16} /><p className='ml-2'>Marketplace</p>
                            </span>
                        </Link>
                    </li>

                    <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                        <Link href="/dashboard/datatables">
                            <span className='flex items-center'>
                                <BsClipboardDataFill size={16} /><p className='ml-2'>Data Tables</p>
                            </span>
                        </Link>
                    </li>

                    <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                        <Link href="/dashboard/profiles">
                            <span className='flex items-center'>
                                <FaUser size={16} /><p className='ml-2'>Profiles</p>
                            </span>
                        </Link>
                    </li>

                    <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                        <Link href="/dashboard/charts">
                            <span className='flex items-center'>
                                <FaChartColumn size={16} /><p className='ml-2'>Charts</p>
                            </span>
                        </Link>
                    </li>

                    <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                        <Link href="/">
                            <span className='flex items-center'>
                                <MdOutlineAttachMoney size={20} /><p className='ml-2'>Bilan</p>
                            </span>
                        </Link>
                    </li>
                </ul>

            </nav>

            <hr className='w-4/5 border-t border-slate-600/70' />

            <nav className="flex items-center justify-center h-full">

                <ul className='flex flex-col items-start'>
                    <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                        <Link href="/dashboard/products-admin">
                            <span className='flex items-center'>
                                <FaProductHunt size={18} /><p className='ml-2'>Products</p>
                            </span>
                        </Link>
                    </li>

                    <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                        <Link href="/">
                            <span className='flex items-center'>
                                <IoChatbubblesOutline size={18} /><p className='ml-2'>Chat</p>
                            </span>
                        </Link>
                    </li>

                    <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                        <Link href="/dashboard/datatables">
                            <span className='flex items-center'>
                                <TbCircleLetterB size={20} /><p className='ml-2'>Blog</p>
                            </span>
                        </Link>
                    </li>

                    <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                        <Link href="/dashboard/dashboardnative/profile">
                            <span className='flex items-center'>
                                <FaUser size={16} /><p className='ml-2'>Comments</p>
                            </span>
                        </Link>
                    </li>

                    <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                        <Link href="/dashboard/charts">
                            <span className='flex items-center'>
                                <FaChartColumn size={16} /><p className='ml-2'>All Data Users</p>
                            </span>
                        </Link>
                    </li>

                </ul>

            </nav>

        </div>
    )
};
