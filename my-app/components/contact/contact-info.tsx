import React from 'react'

export default function ContactInfo() {
    return (
        <>
            <div className='w-full bg-slate-50/30 mx-auto my-4 px-4 py-6 rounded shadow-in'>

                <div className='w-[90%] m-auto flex flex-row items-center justify-center py-1'>
                    <h3 className='w-2/5 text-slate-500'>Name:</h3>
                    <h3 className='w-3/5 text-center text-slate-600 bg-slate-200/70 px-2 py-1 rounded'>Admin User</h3>
                </div>

                <div className='w-[90%] m-auto flex flex-row items-center justify-center py-1'>
                    <p className='w-2/5 text-slate-500'>Email:</p>
                    <p className='w-3/5 text-center text-slate-600 bg-slate-200/70 px-2 py-1 rounded'>admin@prisma.io</p>
                </div>

                <div className='w-[90%] m-auto flex flex-row items-center justify-center py-1'>
                    <p className='w-2/5 text-slate-500'>Phone:</p>
                    <p className='w-3/5 text-center text-slate-600 bg-slate-200/70 px-2 py-1 rounded'>079 444 76 78</p>
                </div>

            </div>

            <div className='w-full bg-slate-50/30 mx-auto mt-4 px-4 py-4 rounded shadow-in'>

                <div className='mb-2 pl-2'>
                    <h3 className='text-lg text-slate-500'>
                        Opening Hours
                    </h3>
                </div>

                <div className="w-[80%] m-auto flex items-center justify-center py-1">
                    <p className='w-2/5 h-full text-slate-500 py-1'>Morning:</p>
                    <p className='w-3/5 h-full text-center text-slate-600 bg-slate-200/70 px-2 py-1 rounded'>08h00-12h00</p>
                </div>

                <div className="w-[80%] m-auto flex items-center justify-center py-1">
                    <p className='w-2/5 h-full text-slate-500 py-1'>Afternoon:</p>
                    <p className='w-3/5 h-full text-center text-slate-600 bg-slate-200/70 px-2 py-1 rounded'>14h00-18h00</p>
                </div>

                <div className="w-[80%] m-auto flex items-center justify-center py-1">
                    <p className='w-2/5 h-full text-slate-500 py-1'>Saturday:</p>
                    <p className='w-3/5 h-full text-center text-slate-600 bg-slate-200/70 px-2 py-1 rounded'>14h00-18h00</p>
                </div>

            </div>
        </>
    )
};
