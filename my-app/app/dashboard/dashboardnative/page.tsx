import React from 'react';
import Header from '@/app/components/Header';
import Menu from '@/app/components/Menu';

export default function DashboardPage() {
    return (
        <>
            <div className='absolute right-0 z-10 flex flex-row items-center w-[80%] xl:w-[86%] h-[10vh] 
                bg-slate-200 border-b border-slate-300/20 shadow-md'>
                <Header />
            </div>

            <div className='flex-none w-[20%] xl:w-[14%] h-full bg-slate-800'>
                <Menu />
            </div>
        </>
    )
};
