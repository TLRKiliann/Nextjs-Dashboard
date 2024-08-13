import Link from 'next/link';

export default function OrderPayment({methodOfPayment}: {methodOfPayment: string}) {
    return (
        <div className='w-full h-full border border-slate-500/30 p-4 rounded'>

            <div>
                <h2 className='font-bold'>Payment Method</h2>
            </div>

            <div className='bg-slate-100 my-4 px-4 py-2'>
                <p className='text-base'>{methodOfPayment}</p>
            </div>

            <div>
                <li className='list-none'>
                    <Link 
                        href="/order/payment-method" 
                        className='text-slate-50 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 py-1 rounded shadow-md'>
                        Edit
                    </Link>
                </li>
            </div>

        </div>
    )
}
