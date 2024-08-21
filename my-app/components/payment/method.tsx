"use client";

import React, { useState } from 'react'
import MethodLblInput from './method-content/method-lbl-input';
import MethodBtn from './method-content/method-btn';

type MethodProps = {
    paypalMethod: boolean;
    stripeMethod: boolean;
    onDeliveryMethod: boolean;
};

export default function MethodPage() {

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
                    
                    <MethodLblInput 
                        id="paypal"
                        value="option1"
                        paymentMethod={paymentMethod.paypalMethod}
                        handlePaypal={(e) => handlePaypal(e)}
                    >
                        Paypal
                    </MethodLblInput>

                    <MethodLblInput 
                        id="stripe"
                        value="option2"
                        paymentMethod={paymentMethod.stripeMethod}
                        handlePaypal={(e) => handleStripe(e)}
                    >
                        Stripe
                    </MethodLblInput>

                    <MethodLblInput 
                        id="ondelivery"
                        value="option3"
                        paymentMethod={paymentMethod.onDeliveryMethod}
                        handlePaypal={(e) => handleDelivery(e)}
                    >
                        Cash One Delivery
                    </MethodLblInput>
                 
                </div>    
                
                <MethodBtn pathMethod={pathMethod} />

            </div>
        </div>
    )
}
