import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import type { Product } from '@prisma/client';
import { redirect } from 'next/navigation';
import Image from 'next/image';

type TypeProduct = {
    quantity: number;
};

type UserType = {
    products: TypeProduct[];
};

export default async function ProductNameCard({params}: {params: {productName: string}}) {

    const session = await auth();
    const user = session?.user;

    if (!user?.id) {
        return redirect("/api/auth/signin");
    };

    const products: Product[] = await prisma.product.findMany({
        orderBy: {
            id: "asc",
        }
    });

    if (!products) {
        throw new Error("Error: fetch products failed!");
    }

    const storeQuantity: UserType | null = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            products: {
                select: {
                    quantity: true,
                } 
            }
        }
    });

    if (!storeQuantity) {
        throw new Error("storeQuantity not set!");
    };

    const totalQuantity = storeQuantity.products.reduce((acc, product) => acc + product.quantity, 0);
    console.log('Total des quantités :', totalQuantity);

    return (
        <div className='min-h-screen bg-gradient-to-tr from-slate-700 to-slate-950 pt-[25%]'>
            {products.map((product: Product) => (
                String(params.productName) === product.name ? (

                    <div key={product.id} 
                        className='w-[360px] m-auto bg-gradient-to-tr from-slate-200 to-slate-300 rounded-md 
                        shadow-indarker p-4'>

                        <div className='flex flex-row items-start justify-between
                            bg-gradient-to-tr from-slate-700 to-slate-950 rounded-md shadow-outdarker p-4'>
                            
                            <div>
                                <Image
                                    src={product.img}
                                    width={100}
                                    height={100}
                                    className="object-fit rounded-md"
                                    alt="no img"
                                />
                            </div>
                            
                            <div>
                                <h3 className='text-xl font-bold'>Family: {product.family}</h3>
                                <h4 className='text-lg'>Model: {product.name}</h4>
                                <p className='text-base'>Version: {product.version}</p>
                                <p className='text-base'>Stock: {product.stock}pces</p>
                                <p className='text-lg'>Quantity: {totalQuantity}</p>
                                <p className='text-lg font-bold'>Price: {product.quantity !== 0 
                                    ? product.quantity * product.price 
                                    : product.price}.-
                                </p>
                            </div>
                        </div>
                    </div>
                ) : null
            ))}
        </div>
    )
}
