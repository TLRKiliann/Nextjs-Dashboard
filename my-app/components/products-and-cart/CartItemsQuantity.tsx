import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import { redirect } from 'next/navigation';

type ProductType = {
    quantity: number;
}

type UserType = {
    products: ProductType[];
};

export default async function CartItemsQuantity() {

    const session = await auth();
    const user = session?.user;

    if (!user?.email) {
        return redirect("/api/auth/signin");
    };
    
    const storeQuantity: UserType | null = await prisma.user.findUnique({
        where: {
            email: user.email,
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

    const totalQuantity = storeQuantity.products.reduce((acc: number, product: {quantity: number}) => acc + product.quantity, 0);
    
    return (
        <div className='absolute top-0'>
            <p className={`${totalQuantity > 0 ? "opacity-100" : "opacity-0"} flex items-center justify-center 
                border-none w-[24px] h-[24px] text-sm font-bold text-white bg-blue-500 rounded-full mt-[20px] ml-[12px]`}>
                {totalQuantity}
            </p>
        </div>
    )
};
