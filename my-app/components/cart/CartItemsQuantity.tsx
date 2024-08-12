import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/prisma/prisma';

type ProductType = {
    quantity: number;
};

type UserType = {
    id: string;
    carts: ProductType[];
};

export default async function CartItemsQuantity() {
    const session = await auth();
    const user = session?.user;
    
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
                    quantity: true,
                } 
            }
        }
    });

    if (!storeQuantity) {
        throw new Error("storeQuantity not set!");
    };

    const totalQuantity = storeQuantity.carts.reduce((acc: number, product: {quantity: number}) => acc + product.quantity, 0);

    return (
        <div className='absolute top-0'>
            <p className={`${totalQuantity > 0 ? "opacity-100" : "opacity-0"} flex items-center justify-center 
                border-none w-[24px] h-[24px] text-sm font-bold text-white bg-blue-500 rounded-full mt-[20px] ml-[12px]`}>
                {totalQuantity}
            </p>
        </div>
    )
};
