'use client'

import { useRouter } from 'next/navigation';
import React from 'react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  // for router.back()
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center w-full h-[80%]'>
      <h3 className='text-base font-bold text-justify text-red-400'>Error: {error.message}</h3>
      <button 
        type="button" 
        onClick={() => router.back()} 
        className="text-slate-50 bg-blue-600 mt-4 px-4 py-2 rounded"
      >
        Go back !
      </button>
    </div>
  )
}