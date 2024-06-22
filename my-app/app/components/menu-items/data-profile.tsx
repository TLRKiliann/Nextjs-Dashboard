import React from 'react';

export default function DataProfile({children, varDef}: {children: React.ReactNode, varDef: string}) {
    return (
        <div className='w-full flex flex-row items-center justify-start 
            md:text-base lg:text-base xl:text-xl'>
            <p className="w-[40%]">
                {varDef}
            </p>
            <p className="w-[60%] bg-slate-100 px-4 py-1">
                {children}
            </p>
        </div>
    )
}
