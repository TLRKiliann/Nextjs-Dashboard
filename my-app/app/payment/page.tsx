import React from 'react'

export default function Payment() {
    return (
        <div className='flex flex-row items-center justify-around w-full min-h-screen text-black bg-slate-100'>
            
            <div className='flex flex-col items-center justify-center w-[40%] bg-black m-auto'>
                <div className='bg-cyan-400'>
                    <h2>Payment</h2>
                </div>

                <div className='bg-cyan-400'>
                    mode of payment 1
                </div>

                <div className='bg-cyan-400'>
                    mode of payment 2
                </div>
            </div>

            <div className='flex flex-col items-center justify-center w-[40%] bg-black m-auto'>
                <div className='bg-yellow-400'>
                    <h2>Cart Items</h2>
                </div>

                <div className='bg-yellow-400'>
                    table 1
                </div>

                <div className='bg-yellow-400'>
                    table 2
                </div>
            </div>

        </div>
    )
}
