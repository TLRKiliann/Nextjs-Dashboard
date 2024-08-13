import prisma from '@/prisma/prisma';
import { User } from 'next-auth';
import Link from 'next/link';

type PaymentType = {
    address: string,
    city: string,
    npa: string,
    country: string,
}

type UserType = {
    payments: PaymentType[];
};

export default async function OrderShipping({user}: {user: User}) {

    const shipping: UserType | null = await prisma.user.findUnique({
        where: {
            id: user.id
        },
        include: {
            payments: {
                select: {
                    address: true,
                    city: true,
                    npa: true,
                    country: true,
                }
            }
        }       
    });

    const lastAddress = shipping?.payments.map((ship) => ship.address);
    const lastCity = shipping?.payments.map((ship) => ship.city);
    const lastNpa = shipping?.payments.map((ship) => ship.npa);
    const lastCountry = shipping?.payments.map((ship) => ship.country);

    return (
        <div className='w-full h-full border border-slate-500/30 p-4 rounded'>

            <div>
                <h2 className='font-bold'>Shipping Address</h2>
            </div>

            <div className='flex flex-col items-center justify-center w-full bg-slate-100 m-auto my-4 p-4 rounded'>

                <div className='flex flex-row items-center justify-between w-full py-2'>
                    <label className="text-lg text-slate-600/90" htmlFor='address'>Address:</label>
                    <p>{lastAddress ? lastAddress[lastAddress.length - 1] : undefined}</p>
                </div>
                <div className='flex flex-row items-center justify-between w-full py-2'>
                    <label className="text-lg text-slate-600/90" htmlFor='city'>City:</label>

                    <p>{lastCity ? lastCity[lastCity.length - 1] : undefined}</p>
                </div>

                <div className='flex flex-row items-center justify-between w-full py-2'>
                    <label className="text-lg text-slate-600/90" htmlFor='npa'>NPA:</label>
                    <p>{lastNpa ? lastNpa[lastNpa.length - 1] : undefined}</p>
                </div>

                <div className='flex flex-row items-center justify-between w-full py-2'>

                    <label className="text-lg text-slate-600/90" htmlFor='country'>Country:</label>
                    <p>{lastCountry ? lastCountry[lastCountry.length - 1] : undefined}</p>

                </div>
                
            </div>

            <div>
                <li className='list-none'>
                    <Link href="/order/address" className='text-slate-50 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 py-1 rounded shadow-md'>
                        Edit
                    </Link>
                </li>
            </div>

        </div>
    )
}
