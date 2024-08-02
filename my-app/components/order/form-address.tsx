"use client";

import { saveAddress } from '@/lib/actions';
import { useAction } from 'next-safe-action/hooks';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type AddressProps = {
    addressData: string;
    cityData: string;
    npaData: string;
    countryData: string;
}

export default function FormAddress() {

    // next-safe-action
    const { execute } = useAction(saveAddress, {
        onSuccess: () => {
            toast.success("Address Successfully Registered!");
            console.log("Address Successfully Registered!");
        },
        onError: () => {
            toast.error("Error with message!");
            console.log("Error with message!");
        }
    });

    const [allStatesAddress, setAllStateAddress] = useState<AddressProps>({
        addressData: "",
        cityData: "",
        npaData: "",
        countryData: ""
    });

    const handleAddress = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAllStateAddress((prev) => ({...prev, addressData: event.target.value}));
    };

    const handleCity = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAllStateAddress((prev) => ({...prev, cityData: event.target.value}));
    };

    const handleNpa = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAllStateAddress((prev) => ({...prev, npaData: event.target.value}));
    };

    const handleCountry = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAllStateAddress((prev) => ({...prev, countryData: event.target.value}));
    };

    const isButtonDisabled = () => {
        return !allStatesAddress.addressData || !allStatesAddress.cityData || 
            !allStatesAddress.npaData || !allStatesAddress.countryData;
    };

    return (
        <div className='flex flex-col items-center justify-center w-full min-h-screen text-slate-500 bg-slate-100'>

            <form 
                action={execute} 
                className='flex flex-col items-start justify-center w-[440px] h-full bg-white px-4 py-6 rounded shadow-lg'>
            
                <div className='pl-4'>
                    <h1 className='text-xl font-bold'>Address</h1>
                </div>

                <div className='flex flex-col items-center justify-center w-5/6 bg-slate-100 m-auto my-4 px-4 py-2 rounded'>

                    <div className='flex flex-row items-center justify-between w-full py-2'>
                        <label className="text-lg text-slate-600/90" htmlFor='address'>Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={allStatesAddress.addressData}
                            onChange={(e) => handleAddress(e)}
                            placeholder="address"
                            className='w-[200px] bg-white px-3 py-1'
                        />
                    </div>
                    <div className='flex flex-row items-center justify-between w-full py-2'>
                        <label className="text-lg text-slate-600/90" htmlFor='city'>City:</label>

                        <input 
                            type="text" 
                            id="city"
                            name="city"
                            value={allStatesAddress.cityData}
                            onChange={(e) => handleCity(e)}
                            placeholder="city"
                            className='w-[200px] bg-white px-3 py-1'
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between w-full py-2'>
                        <label className="text-lg text-slate-600/90" htmlFor='npa'>NPA:</label>
                        <input 
                            type="text" 
                            id="npa"
                            name="npa"
                            value={allStatesAddress.npaData}
                            onChange={(e) => handleNpa(e)}
                            placeholder="npa"
                            className='w-[200px] bg-white px-3 py-1'
                        />
                    </div>

                    <div className='flex flex-row items-center justify-between w-full py-2'>

                        <label className="text-lg text-slate-600/90" htmlFor='country'>Country:</label>
                        <input 
                            type="text" 
                            id="country"
                            name="country"
                            value={allStatesAddress.countryData}
                            onChange={(e) => handleCountry(e)}
                            placeholder="country"
                            className='w-[200px] bg-white px-3 py-1'
                        />

                    </div>

                </div>

                <div className='flex flex-row items-center justify-between w-5/6 m-auto mt-4 mb-2'>

                    <li className='list-none'>
                        <Link href="/products/cart" className='text-slate-50 font-bold bg-blue-500 
                            hover:bg-blue-600 active:bg-blue-700
                            px-4 py-2 rounded shadow-md'>
                            Cart
                        </Link>
                    </li>

                    <li className='list-none'>
                        <button
                            type="submit"
                            className='text-slate-50 font-bold bg-blue-500 hover:bg-blue-600 active:bg-blue-700
                            transition-colors disabled:opacity-50 px-4 py-2 rounded shadow-md'
                            disabled={isButtonDisabled() ? true : false}
                        >
                            Payment
                        </button>
                    </li>

                </div>

            </form>
        
        </div>
    )
}