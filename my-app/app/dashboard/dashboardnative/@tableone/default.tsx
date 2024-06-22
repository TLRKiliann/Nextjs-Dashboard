import { CustomersProps } from '@/app/lib/definitions';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TablePage from '@/app/components/TablePage';
import { customers } from '@/app/lib/datadb';

export default function TableOneDefault() {
    return (
        <TablePage>
            <div className='h-[10%]'>
                <h2 className='text-xl'>Customers</h2>
            </div>


            <div className='relative top-0 h-[80%] z-10'>

                <ul className='w-full h-[100%] bg-slate-800 overflow-y-auto
                    flex flex-col items-center border-4 border-slate-700 rounded-lg px-2'>

                    {customers.map((customer: CustomersProps) => (
                        <li key={customer.id} className='w-full bg-slate-50 my-2 shadow-out rounded-lg'>

                            <div className='flex items-center text-slate-500/90 px-2'>
                                
                                <Image src={customer.img} width={400} height={250} alt="no-img" 
                                    className='w-[50px] h-[50px] border border-slate-500 object-cover my-1 rounded-full'/>

                                <div className='w-[80px] mx-2'>
                                    <p className='text-base font-bold'>{customer.username}</p>
                                    <p className='text-xs'>{customer.country}</p>
                                </div>

                                <div className='w-[200px] flex items-center justify-between'>
                                    
                                    <div className="flex items-center justify-center ml-8">
                                        <p className='text-sm mr-2'>Online</p>

                                        {customer.connected === true ? (
                                            <span className='w-[12px] h-[12px] bg-green-500 border border-slate-500/50 rounded-full'></span>
                                        ) : (
                                            <span className='w-[12px] h-[12px] bg-red-500 border border-slate-500/50 rounded-full'></span>
                                        )}
                                    </div>
                                
                                    <p className='flex justify-end text-sm font-bold'>{customer.spend}.-</p>    
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>


            <div className='flex items-end justify-end h-[10%]'>
                <li className='list-none text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    <Link href="/dashboard/dashboardnative/traffic">Daily Traffic</Link>
                </li>
            </div>
        </TablePage>
    )
}