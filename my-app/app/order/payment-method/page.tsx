"use client";

import { recordMethod } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type MethodProps = {
    paypalMethod: boolean;
    stripeMethod: boolean;
    onDeliveryMethod: boolean;
};

export default function PaymentMethodPage() {

    const router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState<MethodProps>({
        paypalMethod: false,
        stripeMethod: false,
        onDeliveryMethod: false,
    });

    const [pathMethod, setPathMethod] = useState<string>("");

    const handlePaypal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod({
            paypalMethod: event.currentTarget.checked,
            stripeMethod: false,
            onDeliveryMethod: false
        })
        setPathMethod("Paypal");
    };

    const handleStripe = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod({
            paypalMethod: false,
            stripeMethod: event.currentTarget.checked,
            onDeliveryMethod: false
        })
        setPathMethod("Stripe");
    };

    const handleDelivery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPaymentMethod({
            paypalMethod: false,
            stripeMethod: false,
            onDeliveryMethod: event.currentTarget.checked,
        })
        setPathMethod("On_Delivery");
    };

    return (
        <div 
            className='flex flex-col items-center justify-center w-full min-h-screen text-slate-800 bg-slate-100'>

            <div className='flex flex-col items-start justify-between w-[360px] h-full bg-white px-4 py-6 
                rounded shadow-lg'>

                <div className='flex items-center w-full h-[40px] mb-4 pl-4'>
                    <h1 className='text-lg font-bold text-slate-500'>
                        Payment Method
                    </h1>
                </div>

                <div className='w-4/5 h-[60%] flex flex-col items-start text-slate-700 bg-slate-100 rounded ml-8 p-4'>
                    
                    <div className='flex flex-row items-center justify-sart'>
                        <label htmlFor="paypal">
                            <input 
                                type="radio" 
                                id="paypal" 
                                value="option1" 
                                checked={paymentMethod.paypalMethod}
                                onChange={(e) => handlePaypal(e)}
                                className='mr-5'
                            />
                            Paypal
                        </label>
                    </div>

                    <div className='flex flex-row items-center justify-sart'>

                        <label htmlFor="stripe" className='pt-1'>
                            <input
                                type="radio"
                                id="stripe"
                                value="option2"
                                checked={paymentMethod.stripeMethod}
                                onChange={handleStripe}
                                className='mr-5'
                            />
                                Stripe
                        </label>
                    </div>

                    <div className='flex flex-row items-center justify-sart'>
                        <label htmlFor="ondelivery" className='pt-1'>
                            <input
                                type="radio"
                                id="ondelivery"
                                value="option3"
                                checked={paymentMethod.onDeliveryMethod} 
                                onChange={handleDelivery}
                                className='mr-5' 
                            />
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
                        type="button"
                        onClick={async () => {
                            const response = await recordMethod({pathMethod});

                            if (response?.validationErrors) {
                                toast.error("Payment method failed!");
                            };
                            if (response?.serverError) {
                                toast.error("Error with payment method");
                            };
                            toast.success("Payment method done!");
                        }}
                        className={`${!pathMethod ? "opacity-50" : "opacity-100"} text-base text-slate-50 
                            font-bold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-6 py-[5px] 
                            rounded shadow-lg`}
                        disabled={!pathMethod ? true : false}    
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
