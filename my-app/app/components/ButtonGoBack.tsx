"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function ButtonGoBack({text} : {text: string}) {
    
    const router = useRouter();

    return (
        <div className='flex items-end justify-end h-[10%] border'>
            <button type="button" onClick={() => router.back()}
                className='text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                {text}
            </button>
        </div>
    )
}
