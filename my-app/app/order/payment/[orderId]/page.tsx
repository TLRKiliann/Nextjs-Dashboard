import { notFound } from 'next/navigation';
import OrderItems from '@/components/order/order-items';
import OrderSummary from '@/components/order/order-summary';
import OrderShipping from '@/components/order/order-shipping';
import OrderPayment from '@/components/order/order-payment';


export default function OrderPage({params}: {params: {orderId: string}}) {

    if (!params.orderId) {
        notFound();
    };

    return (
        <div className='w-full min-h-screen text-slate-700 bg-slate-50 p-4'>
            
            <div className='px-2 py-4'>
                <h1 className='text-xl font-bold'>Place Order</h1>
            </div>

            <div className='grid grid-cols-2 grid-flow-row h-auto mx-2'>


                <div className='flex flex-col w-full m-auto bg-white'>
                    
                    <div className='flex flex-col items-start justify-evenly w-full h-full p-4'>

                        <OrderShipping />

                    </div>

                    <hr className='w-4/5 m-auto' />

                    <div className='flex flex-col items-start justify-evenly w-full h-full p-4'>

                        <OrderPayment params={params} />

                    </div>

                    <hr className='w-4/5 m-auto' />

                    <div className='flex flex-col items-start justify-between w-full h-full p-4'>

                        <OrderSummary />

                    </div>
                </div>
 
                <div className='flex flex-col items-center justify-center bg-white w-full h-full m-auto'>
                
                    <div className='w-full h-full p-4 rounded'>

                        <OrderItems />

                    </div>

                    <div className='flex flex-col items-center justify-center w-[92%]'>
                        <button type="submit" className='w-full text-base font-bold text-slate-50 bg-blue-500 
                            hover:bg-blue-600 active:bg-blue-700 py-2 rounded'>
                            Place Order
                        </button>
                    </div>


                </div>

            </div>


        </div>
    )
}
