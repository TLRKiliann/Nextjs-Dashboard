import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
            <div className='flex flex-col items-center justify-center w-[45%] h-[80vh] bg-white p-4 rounded-md shadow-md'>
                <p className='text-3xl'>Method {params.method}</p>
                <Link href="/" className='text-blue-500 hover:text-blue-600 active:text-blue-700 transition-colors'>Back to Home</Link>
            </div>

        </div>
    )
};
