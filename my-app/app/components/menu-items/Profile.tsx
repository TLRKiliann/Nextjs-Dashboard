import React from 'react';
//import Link from 'next/link';

export default function Profile() {
    return (
        <div className='flex flex-col justify-center w-full h-full'>
            <div className='flex flex-col items-start justify-center p-4'>
                <p>Username: </p>
                <p>Lastname: </p>
                <p>Address: </p>
                <p>City: </p>
                <p>Country: </p>
                <p>Sepend: </p>
                <p>Articles Quantity: </p>
                <p>Browser: </p>
                <p>OS: </p>
            </div>
        </div>
    )
}
