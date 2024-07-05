"use client";

import { useRouter } from 'next/router';
import React, { useState } from 'react'

type MethodProps = {
    paypalMethod: boolean;
    stripeMethod: boolean;
    onDeliveryMethod: boolean;
}

export default function Payment() {

    const router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState<MethodProps>({
        paypalMethod: false,
        stripeMethod: false,
        onDeliveryMethod: false,
    });

    //server-actions with form action or only btn action

    const handlePaypal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod({
            paypalMethod: event.currentTarget.checked,
            stripeMethod: false,
            onDeliveryMethod: false
        })
    }

    const handleStripe = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod({
            paypalMethod: false,
            stripeMethod: event.currentTarget.checked,
            onDeliveryMethod: false
        })
    }

    const handleDelivery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod({
            paypalMethod: false,
            stripeMethod: false,
            onDeliveryMethod: event.currentTarget.checked,
        })
    }

    return (
        <div className='flex flex-col items-center justify-center w-full min-h-screen text-slate-800 bg-slate-100'>

            <form action="#" className='flex flex-col items-start justify-between w-[360px] h-full bg-white px-4 py-6 rounded shadow-lg'>

                <div className='flex items-center w-full h-[40px] mb-4 pl-4'>
                    <h2 className='text-lg font-bold text-slate-500'>
                        Payment Method
                    </h2>
                </div>

                <div className='w-[240px] h-[60%] flex flex-col items-start text-slate-700 bg-slate-100 rounded ml-10 p-2'>
                    
                    <div className='flex flex-row items-center justify-sart'>
                        <input 
                            type="radio" 
                            id="paypal" 
                            value="option1" 
                            checked={paymentMethod.paypalMethod}
                            onChange={(e) => handlePaypal(e)}
                        />
                        <label htmlFor="" className='ml-4 p-1'>
                            Paypal
                        </label>
                    </div>

                    <div className='flex flex-row items-center justify-sart'>
                        <input
                            type="radio"
                            id="stripe"
                            value="option2"
                            checked={paymentMethod.stripeMethod}
                            onChange={handleStripe}
                        />
                        <label htmlFor="ondelivery" className='ml-4 p-1'>
                            Stripe
                        </label>
                    </div>

                    <div className='flex flex-row items-center justify-sart'>
                        <input
                            type="radio"
                            id="ondelivery"
                            value="option3"
                            checked={paymentMethod.onDeliveryMethod} 
                            onChange={handleDelivery} 
                        />
                        <label htmlFor="ondelivery" className='ml-4 p-1'>
                            Cash One Delivery
                        </label>
                    </div>
                 
                </div>    

                <div className='w-full h-[20%] flex flex-row items-center justify-around mt-8 pb-2'>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className='text-base text-slate-50 font-bold bg-blue-500 
                            hover:bg-blue-600 active:bg-blue-700
                            px-6 py-[5px] rounded shadow-lg'>
                        Back
                    </button>
                    <button 
                        type="submit"
                        className='text-base text-slate-50 font-bold bg-blue-500 
                            hover:bg-blue-600 active:bg-blue-700
                            px-6 py-[5px] rounded shadow-lg'>
                        Next
                    </button>
                </div>
            
            </form>

        </div>
    )
}
