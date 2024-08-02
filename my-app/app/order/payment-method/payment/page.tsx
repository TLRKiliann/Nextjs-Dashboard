import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import OrderItems from '@/components/order/order-items';
import OrderSummary from '@/components/order/order-summary';
import OrderShipping from '@/components/order/order-shipping';
import OrderPayment from '@/components/order/order-payment';

export default async function OrderPage() {

    const session = await auth();
    const user = session?.user;

    if (!user?.id) {
        return redirect("/api/auth/signin");
    };

    const paymentMethod = await prisma.user.findUnique({
        where: {
            id: user.id
        },
        include: {
            payments: {
                select: {
                    usernameId: true,
                    method: true
                }
            }
        }
    });

    if (!paymentMethod) {
        throw new Error("Error: payment method fetch failed!");
    }

    const findMethod = paymentMethod?.payments.find((meth) => meth.usernameId === user.id ? {...meth, method: meth.method}: meth);
    
    if (findMethod) {
        console.log(findMethod, "findMethod")
    } else {
        throw new Error("Error: no method")
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

                        <OrderPayment findMethod={findMethod} />

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
                        <Link href={`/order/payment-method/payment/${findMethod.method}`}
                            className='w-full text-base text-center font-bold text-slate-50 bg-blue-500 
                            hover:bg-blue-600 active:bg-blue-700 transition-colors py-2 rounded'>
                            Place Order
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};
