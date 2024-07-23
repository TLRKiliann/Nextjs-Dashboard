import { PrismaClient, Product, type User } from '@prisma/client';
import Image from 'next/image';
import TablePage from '@/components/TablePage';

type ProductType = {
    quantity: number;
    price: number;
};

type UserType = {
    id: string;
    name: string;
    image: string;
    isConnected: boolean;
    products: ProductType[];
};

const prisma = new PrismaClient();

export default async function TableOneDefault() {

    const users: User[] | null = await prisma.user.findMany({
        orderBy: {
            id: "asc"
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

    if (!users) {
        throw new Error("users cannot be fetched by prisma");
    };

    function calculateUserTotals(user: any): { totalPrice: number; quantityOfProducts: number; } {
        const quantityOfProducts = user.products.reduce((acc: number, product: { quantity: number; }) => acc + product.quantity, 0);
        const priceOfQuantity = user.products.reduce((acc: number, product: { price: number; quantity: number; }) => acc + (product.price * product.quantity), 0);
        const totalPrice = priceOfQuantity;
        return { totalPrice, quantityOfProducts };
    };

    return (
        <TablePage title="Members" url="" link="">

            <div className='relative top-0 h-[80%] z-10'>

                <ul className='w-full h-[100%] bg-slate-100 overflow-y-scroll no-scrollbar
                    flex flex-col items-center rounded-lg px-2 shadow-in'>

                    {users.map((customer: User) => {
                        const { totalPrice, quantityOfProducts } = calculateUserTotals(customer);
                        return (
                        <li key={customer.id} className='w-full bg-slate-50 my-2 shadow-sm-out rounded-lg'>

                            <div className='flex items-center justify-between text-slate-500/90 px-2'>
                                
                                <div className='flex flex-row items-center justify-start'>
                                    <Image priority src={String(customer.image)} width={500} height={333} alt="no-img" 
                                        className='w-[50px] h-auto border border-slate-500 object-cover my-1 rounded-full'/>

                                    <div className='w-[80px] mx-2'>
                                        <p className='text-base font-bold'>{customer.name}</p>
                                        {/* <p className='text-xs'>{customer.country}</p> */}
                                    </div>
                                </div>

                                <div className='w-[50%] flex flex-row items-center justify-between'>
                                    
                                    <div className="flex items-center">
                                        <p className={`${customer.isConnected === true ? "ml-0" : "-ml-[2px]"} text-sm mr-2`}>
                                            {customer.isConnected === true ? "Online" : "Offline"}
                                        </p>

                                        {customer.isConnected === true ? (
                                            <span className='w-[12px] h-[12px] bg-green-500 border border-slate-500/50 rounded-full'></span>
                                        ) : (
                                            <span className='w-[12px] h-[12px] bg-red-500 border border-slate-500/50 rounded-full'></span>
                                        )}
                                    </div>
                                
                                    <p className='flex items-center justify-end text-sm font-bold'>{quantityOfProducts} pc</p>
                                    <p className='flex items-center justify-end text-sm font-bold'>{totalPrice}.-</p>
                                </div>

                            </div>
                        </li>
                    )})}
                </ul>
            </div>

        </TablePage>
    )
}
