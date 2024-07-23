import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

type ProductType = {
    quantity: number;
    price: number;
}

type UserType = {
    products: ProductType[];
};

const prisma = new PrismaClient()

export default async function OrderSummary() {
    
    const session = await auth();
    const userSession = session?.user;

    if (!userSession?.email) {
        return redirect("/api/auth/signin");
    };

    const user: UserType | null = await prisma.user.findUnique({
        where: {
            email: userSession.email,
        },
        include: {
            products: {
                select: {
                    quantity: true,
                    price: true,
                }
            }
        }
    });
    await prisma.$disconnect();

    if (!user?.products) {
        throw new Error("Error: fetch products failed!");
    };

    const quantityOfProducts: number = user.products.reduce((acc: number, product: ProductType) => acc + product.quantity, 0);

    const priceOfQuantity: number = user.products.reduce((acc: number, product: ProductType) => acc + (product.price * product.quantity), 0);

    const totalPrice: number = priceOfQuantity;

    return (
        <div className='w-full h-full border border-slate-500/30 p-4 rounded'>

            <div>
                <h2 className='font-bold'>Order Summary</h2>
            </div>

            <div className='w-full bg-slate-100 mt-4 px-4 py-2'>
                <div className='flex flex-row items-center justify-between w-full'>
                    <p className='text-base'>Items Quantity: </p>
                    <p>{quantityOfProducts} pc</p>
                </div>
                <div className='flex flex-row items-center justify-between w-full'>
                    <p className='text-lg font-bold'>Total: </p>
                    <p>{totalPrice}.-</p>
                </div>
            </div>

        </div>
    )
}
