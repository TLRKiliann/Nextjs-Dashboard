import React from 'react'

export default function TableGraphs({children}: {children: React.ReactNode}) {
    return (
        <div className='bg-slate-800 rounded-lg shadow-xl m-4'>
            {children}
        </div>
    )
}
