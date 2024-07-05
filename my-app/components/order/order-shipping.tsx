import Link from 'next/link';
import React from 'react';

export default function OrderShipping() {
    return (
        <div className='w-full h-full border border-slate-500/30 p-4 rounded'>

            <div>
                <h2 className='font-bold'>Shipping Address</h2>
            </div>

            <div className='flex flex-col items-center justify-center w-full bg-slate-100 m-auto my-4 p-4 rounded'>

                <div className='flex flex-row items-center justify-between w-full py-2'>
                    <label className="text-lg text-slate-600/90" htmlFor='address'>Address:</label>
                    <input
                        type="text"
                        id="address"
                        className='w-[200px] bg-slate-100 px-3 py-1'
                    />
                </div>
                <div className='flex flex-row items-center justify-between w-full py-2'>
                    <label className="text-lg text-slate-600/90" htmlFor='city'>City:</label>

                    <input 
                        type="text" 
                        id="city"
                        className='w-[200px] bg-slate-100 px-3 py-1'
                    />
                </div>

                <div className='flex flex-row items-center justify-between w-full py-2'>
                    <label className="text-lg text-slate-600/90" htmlFor='npa'>NPA:</label>
                    <input 
                        type="text" 
                        id="npa"
                        className='w-[200px] bg-slate-100 px-3 py-1'
                    />
                </div>

                <div className='flex flex-row items-center justify-between w-full py-2'>

                    <label className="text-lg text-slate-600/90" htmlFor='country'>Country:</label>
                    <input 
                        type="text" 
                        id="country"
                        className='w-[200px] bg-slate-100 px-3 py-1'
                    />

                </div>
                
            </div>

            <div>
                <li className='list-none'>
                    <Link href="/order/address" className='text-slate-50 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 py-1 rounded shadow-md'>
                        Edit
                    </Link>
                </li>
            </div>

        </div>
    )
}
