import React from 'react'

export default function TablePage({children}: {children: React.ReactNode}) {
    return (
        <div className='w-full'>
            {children}
        </div>
    )
}
