import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import type { Product } from '@prisma/client';
import { redirect } from 'next/navigation';
import Image from 'next/image';

type UserType = {
    products: Product[];
};

export default async function OrderItems() {

    const session = await auth();
    const userSession = session?.user;

    if (!userSession?.id) {
        return redirect("/api/auth/signin");
    };

    const user: UserType | null = await prisma.user.findUnique({
        where: {
            id: userSession.id,
        },
        include: {
            products: {
                orderBy: {
                    id: "asc",
                }
            }
        }
    });

    if (!user?.products) {
        throw new Error("Error: fetch products failed!");
    };

    return (
        <div className='w-full h-full border border-slate-500/30 rounded'>

            <div className='flex flex-col w-full h-full p-4'>

                <div>
                    <h2 className='font-bold'>Order Items</h2>
                </div>

                <div className='w-full bg-slate-100 mt-4 rounded'>
                    {user.products.map((product: Product) => product.quantity !== 0 ? (
                        <div 
                            key={product.id} 
                            className='flex flex-row items-center justify-between bg-white m-4 p-3 
                                rounded shadow-lg'
                        >
                            <Image
                                src={product.img}
                                width={40}
                                height={40}
                                alt="no img" 
                                className="w-[40px] h-[40px] object-cover"
                            />
                            <p className='font-bold'>{product.family}</p>
                            <p>{product.name}</p>
                            <p>{product.quantity} pc</p>
                            <p>{product.price}.-</p>
                        </div>
                    ) : null)}
                </div>
            </div>
        </div>
    )
}
