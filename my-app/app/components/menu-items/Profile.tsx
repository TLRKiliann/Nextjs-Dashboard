"use client";

import { CustomersProps } from '@/app/lib/definitions';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DataProfile from './data-profile';

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
        return () => console.log("clean-up");
    }, []);

    return (
        <div className='flex flex-col justify-center w-full h-full'>
            {customers.map((customer: CustomersProps) => customer.username === userSession ? (
                <div key={customer.id} className='flex flex-col items-start justify-center mx-4'>

                    <div className='relative w-full flex justify-end bg-slate-100'>
                        <Image src={customer.img} width={400} height={250} alt="no img" 
                            className='md:w-[70px] xl:w-[140px] h-auto object-fit rounded-bl-md shadow-md'
                        />
                    </div>

                    <DataProfile varDef="Username:">
                        {customer.username}
                    </DataProfile>
                    
                    <DataProfile varDef="Lastname:">
                        {customer.lastname}
                    </DataProfile>

                    <DataProfile varDef="Address:">
                        {customer.address}
                    </DataProfile>

                    <DataProfile varDef="City:">
                        {customer.city}
                    </DataProfile>

                    <DataProfile varDef="Country:">
                        {customer.country}
                    </DataProfile>

                    <DataProfile varDef="Spend:">
                        {customer.spend}.-
                    </DataProfile>

                    <DataProfile varDef="Articles:">
                        {customer.artQuantity}
                    </DataProfile>

                    <DataProfile varDef="Browser:">
                        {browser?.slice(57, 70)}
                    </DataProfile>

                    <DataProfile varDef="Os:">
                        {ossystem?.slice(18, 30)}
                    </DataProfile>

                </div>
            ) : null)}
        </div>
    )
}
