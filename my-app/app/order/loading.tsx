import React from 'react'

const LoadingPayment = (): JSX.Element => {
    return (
        <div className='fixed z-50 flex items-center justify-center w-full min-h-screen bg-gradient-to-tr from-slate-800 to-slate-950'>
            <p className="text-3xl text-slate-50">loading...</p>
        </div>
    )
};
export default LoadingPayment;
