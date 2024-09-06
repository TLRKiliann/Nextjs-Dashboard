"use client";

import React from 'react';

export default function RefresherGeo() {

    const handleRefresh = (): void => {
        window.location.reload();
    };

    return (
        <div className='absolute flex items-center justify-left h-[10%] text-xs'>
            <button
                type="button"
                onClick={handleRefresh}
                className='text-slate-50 transform duration-100 ease-in-out bg-blue-500 hover:scale-105 hover:bg-blue-600 active:scale-95 active:bg-blue-700 px-2 py-1 rounded'
            >
                Refresh
            </button>
        </div>
    )
};
