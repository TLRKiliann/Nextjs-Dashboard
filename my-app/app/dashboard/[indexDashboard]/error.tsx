'use client'

import { useRouter } from 'next/navigation'

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
    <div className='flex flex-col items-center justify-center w-full h-screen bg-slate-800'>
        <h1 className='text-xl font-bold text-red-400'>{error.message}</h1>
            <button 
              type="button"
              onClick={() => router.back()} 
              className="bg-blue-600 mt-4 px-4 py-2 rounded"
            >
                Back to overview
            </button>
    </div>
  )
}