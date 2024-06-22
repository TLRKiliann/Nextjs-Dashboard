import React from 'react';
import Header from '@/app/components/Header';
import Menu from '@/app/components/Menu';

export default function DashboardIndexPage() {
    return (
        <React.Fragment>
            <div className='fixed right-0 z-10 flex flex-row items-center w-[80%] h-[10vh] bg-slate-200 
                border-b border-slate-300/20 shadow-md'>
                <Header />
            </div>

            <div className='flex-none w-[20%] h-full bg-slate-800'>
                <Menu />
            </div>
        </React.Fragment>
    )
}