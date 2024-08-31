"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

export default function RefresherGeo() {
    
    const router = useRouter();

    return (
        <div className='absolute flex flex-row items-center justify-left h-[10%] text-xs'>
            <p className='text-red-500 mr-2'>Click ip & then Click refresh!</p>
            <button
                type="button"
                onClick={() => router.refresh()}
                className='transition-colors duration-100 ease-in-out text-slate-50 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
                px-2 py-1 rounded'
            >
                Refresh
            </button>
        </div>
    )
}
