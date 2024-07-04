import React from 'react';

export default function DataProfile({children, varDef}: {children: React.ReactNode, varDef: string}) {
    return (
        <div className='w-full h-full flex flex-row items-center justify-between 
            md:text-base lg:text-base xl:text-lg'>

            <div className="flex items-start w-[40%] h-full">
                <p className="text-slate-700">
                    {varDef}
                </p>
            </div>

            <div className='flex items-start w-[60%] h-full bg-slate-100 [&:last-child>span]:rounded-br-lg px-4 py-2'>
                <span>
                    {children}
                </span>
            </div>
            
        </div>
    )
}
