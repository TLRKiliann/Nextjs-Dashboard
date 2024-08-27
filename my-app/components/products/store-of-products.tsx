import type { User } from 'next-auth';
import type { Product } from '@prisma/client';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/prisma/prisma';
import MainBtnAdd from './main-btn-add';

type ProductProps = {
    user: User;
    product: Product;
};

type ProductType = {
    id: number;
    quantity: number;
};

type UserType = {
    id: string;
    carts: ProductType[];
};

export default async function StoreOfProducts({product, user}: ProductProps) {

    if (!user?.id) {
        return redirect("/api/auth/signin");
    };
    const storeQuantity: UserType | null = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            carts: {
                select: {
                    id: true,
                    quantity: true,
                } 
            }
        }
    });

    if (!storeQuantity?.carts) {
        throw new Error("storeQuantity not set!");
    };

    return (
        <div key={product.id} className="animate-up-start w-full h-full text-slate-100 bg-gradient-to-bl from-slate-900 to-cyan-900 rounded-md shadow-xs-out">
            
            <div className='w-full h-full flex flex-col items-center justify-between rounded-md'>

                <div className='flex items-center justify-center w-full h-[60%] bg-white rounded-tl-md rounded-tr-md'>
                    <Image src={product.img}
                        width={160}
                        height={160}
                        className="object-cover rounded-tl-md rounded-tr-md shadow-white" 
                        alt="no img" 
                    />
                </div>

                <div className='flex flex-col items-center justify-between w-full h-[30%] my-4'>
                    <h3 className='text-xl'>{product.family}</h3>
                    <h4 className='text-lg'>{product.name}</h4>
                    <h4 className='text-xs my-2'>Version: {product.version}</h4>
                    <p className='text-base font-bold'>{product.price}.-</p>
                </div>

                <div className='flex items-center justify-center w-full h-[10%]'>
                    <MainBtnAdd
                        id={product.id}
                        name={product.name}
                        storeQuantity={storeQuantity.carts}
                        product={product}
                    />
                </div>

                <div className='h-[10%] text-center my-4'>
                    <li className='list-none text-blue-400/80 hover:text-blue-500/80 
                        active:text-blue-600/80 transition-colors'>
                        <Link href={`/products/${product.name}`}>
                            View product
                        </Link>
                    </li>
                </div>

            </div>
        </div>
    )
};
