"use client";

import { useRouter } from 'next/navigation';

export default function BtnPayment() {
    
    const router = useRouter();

    return (
        <button 
            type="button"
            onClick={() => router.push("/shipping")} 
            className='text-sm font-bold transform duration-100 ease-in-out text-slate-50 bg-blue-600/90
            hover:bg-blue-600 hover:scale-105 hover:shadow-md-out active:bg-blue-700 active:scale-95 active:shadow-none px-4 py-2 rounded shadow-medium-dark'>
            Payment
        </button>
    )
}
