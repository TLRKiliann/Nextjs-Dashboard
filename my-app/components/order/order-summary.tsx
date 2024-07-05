"use client";

import React from 'react'

export default function OrderSummary() {


    return (
        <div className='w-full h-full border border-slate-500/30 p-4 rounded'>

            <div>
                <h2 className='font-bold'>Order Summary</h2>
            </div>

            <div className='w-full bg-slate-100 mt-4 px-4 py-2'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <p className='text-base'>Items: </p>
                    <p>{/* */}blavl</p>
                </div>
                <div className='flex flex-row items-center justify-between w-full'>
                    <p className='text-lg font-bold'>Total: </p>
                    <p>{/* */}blavl</p>
                </div>
            </div>

        </div>
    )
}
