import { Metadata } from 'next';
import React from 'react';
//import HeaderAuth from '@/components/auth/header-auth';

export const metadata: Metadata = {
    title: {
      default: "Auth",
      template: "%s | e-com"
    },
    description: 'Generated by NextJS14',
};

export default function AuthLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center text-base text-slate-800/70 
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white from-0% to-sky-500 
            to-70%">
            {/* <HeaderAuth /> */}
            {children}
        </div>
    )
}
