import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TablePage from '@/app/components/TablePage';
import spinLoader from "@/public/assets/images/bg/loader.png";

export default function LoadingDashboardNative() {
    return (
        <TablePage>
            <div className='h-[10%]'>
                <h2 className='text-xl'>Customers</h2>
            </div>

            <div className='relative top-0 h-[80%] z-10'>

                <Image
                    src={spinLoader}
                    width={40}
                    height={40}
                    alt="img loader"
                    className="w-full h-full object-cover animate-spin" 
                />
 
            </div>

            <div className='flex flex-row items-end justify-end h-[10%]'>
                <li className='list-none text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    <Link href="/dashboard/dashboardnative/profile">Profile</Link>
                </li>
            </div>
        </TablePage>
    )
}
