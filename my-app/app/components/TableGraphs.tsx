import React from 'react'

export default function TableGraphs({children}: {children: React.ReactNode}) {
    return (
        <div className='xl:w-[85%] xl:h-[85%] bg-slate-900/90 transform duration-300 ease-in-out 
            hover:scale-105 m-4 xl:m-12 xl:mt-[40px] rounded-lg shadow-out'>
            {children}
        </div>
    )
}
