import React from 'react'

export default function TableGraphs({children}: {children: React.ReactNode}) {
    return (
        <div className='bg-slate-900/90 transform duration-300 ease-in-out hover:scale-110
            rounded-lg shadow-out m-4'>
            {children}
        </div>
    )
}
