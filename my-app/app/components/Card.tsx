import React from 'react'

export default function Card({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full h-full bg-gradient-to-tr from-slate-700 to-slate-950 rounded-md">
            {children}
        </div>
    )
}
