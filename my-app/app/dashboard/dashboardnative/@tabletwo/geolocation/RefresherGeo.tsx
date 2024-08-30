"use client";

import { useRouter } from 'next/navigation';
import React from 'react';

export default function RefresherGeo() {
    
    const router = useRouter();

    return (
        <>
            <p>Click ip and then click refresh!</p>
            <button
                type="button"
                onClick={() => router.refresh()}
                className='text-slate-50 bg-blue-500 px-4 py-1'
            >
                refresh
            </button>
        </>
    )
}
