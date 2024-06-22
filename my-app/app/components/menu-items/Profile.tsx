"use client";

import { CustomersProps } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const isBrowser = () => typeof window !== 'undefined';

export default function Profile({customers}: {customers: CustomersProps[]}) {
    const userSession: string = "Esteban";

    const [browser, setBrowser] = useState<string | null>(null);
    const [ossystem, setOssystem] = useState<string | null>(null);

    //to avoid ssr error
    useEffect(() => {
        if (isBrowser()) {
            setBrowser((prev) => prev = window.navigator.userAgent);
            setOssystem((prev) => prev = window.navigator.userAgent);
            //const ip = https://jsonip.com/);
        };
    }, []);

    return (
        <div className='flex flex-col justify-center w-full h-full'>
            {customers.map((customer: CustomersProps) => customer.username === userSession ? (
                <div key={customer.id} className='flex flex-col items-start justify-center p-4'>

                    <div className='flex flex-row items-center justify-between w-full h-auto'>
                        
                        <div className='flex flex-col items-start justify-center w-full h-full'>
                            
                            <div className='w-full flex flex-row items-center justify-start mb-2%'>
                                <p className="w-2/5">
                                    Username: 
                                </p>
                                <p className="w-auto -ml-1">
                                    {customer.username}
                                </p>
                            </div>
                            
                            <div className='w-full flex flex-row items-center justify-start mb-2%'>
                                <p className="w-2/5">
                                    Lastname: 
                                </p>
                                <p className="w-auto -ml-1">
                                    {customer.lastname}
                                </p>
                            </div>

                        </div>

                        <div className='w-1/5 border'>
                            <Image src={customer.img} width={400} height={250} alt="no img" 
                                className='object-fit'
                            />
                        </div>
                    </div>

                    <div className='w-4/5 flex flex-row items-center justify-start mb-2%'>
                        <p className="w-2/5">
                            Address: 
                        </p>
                        <p className="w-auto md:text-base xl:text-lg">
                            {customer.address}
                        </p>
                    </div>

                    <div className='w-4/5 flex flex-row items-center justify-start mb-2%'>
                        <p className="w-2/5">
                            City: 
                        </p>
                        <p className="w-auto md:text-base xl:text-lg">
                            {customer.city}
                        </p>
                    </div>

                    <div className='w-4/5 flex flex-row items-center justify-start mb-2%'>
                        <p className="w-2/5">
                            Country: 
                        </p>
                        <p className="w-auto md:text-base xl:text-lg">
                            {customer.country}
                        </p>
                    </div>

                    <div className='w-4/5 flex flex-row items-center justify-start mb-2%'>
                        <p className="w-2/5">
                            Spend: 
                        </p>
                        <p className="w-auto md:text-base xl:text-lg">
                            {customer.spend}
                        </p>
                    </div>

                    <div className='w-4/5 flex flex-row items-center justify-start mb-2%'>
                        <p className="w-2/5">
                            Articles (quantity): 
                        </p>
                        <p className="w-auto md:text-base xl:text-lg">
                            {customer.artQuantity}
                        </p>
                    </div>

                    <div className='w-4/5 flex flex-row items-center justify-start mb-2%'>
                        <p className="w-2/5">
                            Browser: 
                        </p>
                        <p className="w-auto md:text-base xl:text-lg">
                            {browser?.slice(57, 70)}
                        </p>
                    </div>

                    <div className='w-4/5 flex flex-row items-center justify-start mb-2%'>
                        <p className="w-2/5">
                            OS: 
                        </p>
                        <p className="w-auto md:text-base xl:text-lg">
                            {ossystem?.slice(18, 30)}
                        </p>
                    </div>

                </div>
            ) : null)}
        </div>
    )
}
