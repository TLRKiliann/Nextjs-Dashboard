import prisma from '@/prisma/prisma';
import TableGraphs from './TableGraphs';
import QuantityByUsers from './bilan-components/QuantityByUser';
import TotalSalesByProduct from './bilan-components/TotalSalesByProduct';
import BilanConnections from './bilan-components/bilan-connections';
import BilanSales from './bilan-components/bilan-sales';
import BilanSatisfaction from './bilan-components/bilan-satisfaction';
import BilanEmails from './bilan-components/bilan-emails';

interface UserType {
    id: string;
    name: string;
    email: string;
    password: string;
    emailVerified: Date | null;
    image: string | null;
    isConnected: boolean | null;
    carts: { price: number; quantity: number; name: string; }[];
};

export default async function Bilan() {

    const productsQuantityByUser: { [key: string]: number } = {};
    const productsTotalPriceByName: { [key: string]: number } = {};

    const allUserProducts: UserType[] = await prisma.user.findMany({
        include: {
            carts: {
                select: {
                    name: true,
                    quantity: true,
                    price: true,
                }
            }
        }
    });

    if (allUserProducts.length === 0) {
        throw new Error("Error: all");
    }

    allUserProducts.forEach((user: UserType) => {
        let totalQuantity = 0;
        user.carts.forEach((product: {quantity: number}) => {
            totalQuantity += product.quantity;
        });
        productsQuantityByUser[user.name] = totalQuantity;
    });

    allUserProducts.forEach((user) => {
        user.carts.forEach((product) => {
            if (productsTotalPriceByName[product.name]) {
                productsTotalPriceByName[product.name] += product.price * product.quantity;
            } else {
                productsTotalPriceByName[product.name] = product.price * product.quantity;
            }
        });
    });

    return (
        <div className='w-full h-full pb-4'>

            <div className='w-full h-3/6 grid grid-cols-2 grid-rows-1 gap-4 mb-4'>
    
                <TableGraphs>
                    <TotalSalesByProduct productsTotalPriceByName={productsTotalPriceByName} />
                </TableGraphs>

                <TableGraphs>
                    <QuantityByUsers productsQuantityByUser={productsQuantityByUser} />
                </TableGraphs>

            </div>

            <div className='w-full h-3/6 grid grid-cols-1 grid-rows-2 text-slate-600/70 gap-4'>

                <div className='w-full flex flex-row items-center gap-4'>
                    
                    <BilanConnections />

                    <BilanSales />

                </div>

                <div className='w-full flex flex-row items-center gap-4'>
                    
                    <BilanSatisfaction />

                    <BilanEmails />

                </div>

            </div>
        </div>
    )
};