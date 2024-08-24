import React from 'react';
import HeaderAuth from '@/components/auth/header-auth';

export default function AuthLayout({children}: {children: React.ReactNode}) {
    
    return (
        <div className="w-full min-h-screen flex items-center justify-center text-base
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white from-0% to-sky-500 
            to-70%"
        >
            <HeaderAuth />
            {children}
        </div>
    )
}
