import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({params}: {params: {method: string}}): Promise<Metadata> => {
    const title = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(`method ${params.method}`)
        }, 300)
    })
    return {
        title: `Order ${title}`
    }
};

export default function MethodLayout({params, children}: {params: {method: string}, children: React.ReactNode}) {
    
    if (!params.method) {
        notFound();
    }
    
    return (
        <div className='flex flex-row items-center justify-evenly w-full min-h-screen text-slate-800 bg-white p-4'>

            <div className='w-[45%] h-[80vh] bg-white p-4 rounded-md shadow-md'>
                {children}
            </div>
            <div className='w-[45%] h-[80vh] bg-white p-4 rounded-md shadow-md'>
                Method {params.method}
            </div>

        </div>
    )
};
