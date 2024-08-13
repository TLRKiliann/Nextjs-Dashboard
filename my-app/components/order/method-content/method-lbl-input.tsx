import React from 'react';

type MethodProps = {
    id: string;
    value: string;
    paymentMethod: boolean;
    handlePaypal: (event: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode;
}

export default function MethodLblInput({id, value, paymentMethod, handlePaypal, children}: MethodProps) {
    return (
        <div className='flex flex-row items-center justify-sart'>
            <label htmlFor="paypal">
                <input 
                    type="radio" 
                    id={id} 
                    value={value} 
                    checked={paymentMethod}
                    onChange={(e) => handlePaypal(e)}
                    className='mr-5'
                />
                {children}
            </label>
        </div>
    )
}
