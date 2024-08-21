import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center w-full h-screen bg-slate-800'>
            <h3 className='text-3xl text-slate-400'>Error 404 - Not Found</h3>
            <Link href="/order/payment-method/payment"
                className='text-lg text-blue-400 hover:text-blue-500 active:text-blue-600 mt-4'
            >
                Go back
            </Link>
        </div>
    )
};
