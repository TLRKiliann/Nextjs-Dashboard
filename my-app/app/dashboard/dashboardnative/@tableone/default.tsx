import type { CustomersProps } from '@/lib/definitions';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TablePage from '@/components/TablePage';

export default async function TableOneDefault() {

    const response = await fetch("http://localhost:3000/api/customers");
    if (!response) {
        //throw new Error("Error: server cannot fetch customers");
        console.error("Error with server, unable to obtain response for clients");
    };
    const customers = (await response.json()) as CustomersProps[];

    return (
        <TablePage>
            <div className='h-[10%]'>
                <h2 className='text-xl'>Customers</h2>
            </div>

            <div className='relative top-0 h-[80%] z-10'>

                <ul className='w-full h-[100%] bg-slate-100 overflow-y-scroll no-scrollbar
                    flex flex-col items-center rounded-lg px-2 shadow-in'>

                    {customers.map((customer: CustomersProps) => (
                        <li key={customer.id} className='w-full bg-slate-50 my-2 shadow-sm-out rounded-lg'>

                            <div className='flex items-center justify-between text-slate-500/90 px-2'>
                                
                                <div className='flex flex-row items-center justify-start'>
                                    <Image priority src={customer.img} width={50} height={50} alt="no-img" 
                                        className='w-[50px] h-[50px] border border-slate-500 object-cover my-1 rounded-full'/>

                                    <div className='w-[80px] mx-2'>
                                        <p className='text-base font-bold'>{customer.username}</p>
                                        <p className='text-xs'>{customer.country}</p>
                                    </div>
                                </div>

                                <div className='w-[50%] flex flex-row items-center justify-between'>
                                    
                                    <div className="flex items-center">
                                        <p className={`${customer.isConnected === true ? "ml-0" : "-ml-[2px]"} text-sm mr-2`}>
                                            {customer.isConnected === true ? "Online" : "Offline"}
                                        </p>

                                        {customer.isConnected === true ? (
                                            <span className='w-[12px] h-[12px] bg-green-500 border border-slate-500/50 rounded-full'></span>
                                        ) : (
                                            <span className='w-[12px] h-[12px] bg-red-500 border border-slate-500/50 rounded-full'></span>
                                        )}
                                    </div>
                                
                                    <p className='flex items-center justify-end text-sm font-bold'>{customer.spend}.-</p>    
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='flex flex-row items-end justify-end h-[10%]'>
                <li className='list-none text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    <Link href="/profile">Profile</Link>
                </li>
            </div>
        </TablePage>
    )
}
