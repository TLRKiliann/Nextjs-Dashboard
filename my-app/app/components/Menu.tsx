import Link from 'next/link';
import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { FaChartColumn } from "react-icons/fa6";
import { BsClipboardDataFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function Menu() {
    return (
        <div className='flex flex-col items-center justify-start w-auto h-full text-slate-500'>
            
            <h2 className='w-[130px] text-lg text-slate-400/80 mt-5'>Dashboard</h2>
            
            <ul className='my-8'>
                <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                    <Link href="/dashboard/dashboardnative">
                        <span className='flex items-center'>
                            <FaHome size={18} /><p className='ml-2'>Overview</p>
                        </span>
                    </Link>
                </li>

                <li className='list-none text-base transition durantion-200 ease-in-out text-slate-500 hover:text-slate-400/90 mb-4'>
                    <Link href="/">
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
                    <Link href="/dashboard/dashboardnative/profile">
                        <span className='flex items-center'>
                            <FaUser size={16} /><p className='ml-2'>Profile</p>
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

            <hr className='w-4/5 border-t border-slate-600' />

        </div>
    )
}
