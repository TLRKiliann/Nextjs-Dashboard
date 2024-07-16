import React from 'react';

export default function DataProfile({children, varDef}: {children: React.ReactNode, varDef: string}) {
    return (
        <div className='w-full h-full flex flex-row items-center 
            md:text-base lg:text-base xl:text-lg'>

            <div className="w-[40%] h-full pl-2">
                <p className="h-full text-slate-600">
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
