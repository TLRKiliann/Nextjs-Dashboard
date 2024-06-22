import { CustomersProps } from '@/app/lib/definitions';
import React from 'react';
import { customers } from '@/app/lib/datadb';

export default function Profile() {
    const userSession: string = "Esteban";
    const browser: string = "firefox";
    const ossystem: string = "linux"
    return (
        <div className='flex flex-col justify-center w-full h-full'>
            {customers.map((customer: CustomersProps) => customer.username === userSession ? (
                <div key={customer.id} className='flex flex-col items-start justify-center p-4'>
                    <p>Username: {customer.username}</p>
                    <p>Lastname: {customer.lastname}</p>
                    <p>Address: {customer.address}</p>
                    <p>City: {customer.city}</p>
                    <p>Country: {customer.country}</p>
                    <p>Sepend: {customer.spend}</p>
                    <p>Articles Quantity: {customer.artQuantity}</p>
                    <p>Browser: {browser}</p>
                    <p>OS: {ossystem}</p>
                </div>
            ) : null)}
        </div>
    )
}
