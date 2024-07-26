import prisma from '@/prisma/prisma';
import TableGraphs from './TableGraphs';
import QuantityByUsers from './graphs/QuantityByUser';
import SalesByProduct from './graphs/SalesByProduct';
import BilanContentBox from './bilan-content-box';

interface UserType {
    id: string;
    name: string;
    email: string;
    password: string;
    emailVerified: Date | null;
    image: string | null;
    isConnected: boolean | null;
    products: { price: number; quantity: number; name: string; }[];
};

export default async function Bilan() {

    const productsQuantityByUser: { [key: string]: number } = {};
    const productsTotalPriceByName: { [key: string]: number } = {};

    const allUserProducts: UserType[] = await prisma.user.findMany({
        include: {
            products: {
                select: {
                    name: true,
                    quantity: true,
                    price: true,
                }
            }
        }
    });

    allUserProducts.forEach((user: UserType) => {
        let totalQuantity = 0;
        user.products.forEach((product: {quantity: number}) => {
            totalQuantity += product.quantity;
        });
        productsQuantityByUser[user.name] = totalQuantity;
    });

    allUserProducts.forEach((user) => {
        user.products.forEach((product) => {
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
                    <SalesByProduct productsTotalPriceByName={productsTotalPriceByName} />
                </TableGraphs>

                <TableGraphs>
                    <QuantityByUsers productsQuantityByUser={productsQuantityByUser} />
                </TableGraphs>

            </div>

            <div className='w-full h-3/6 grid grid-cols-1 grid-rows-2 text-slate-600/70 gap-4'>

                <div className='w-full flex flex-row items-center gap-4'>
                    
                    <BilanContentBox 
                        str_1="Nb of connection per day"
                        str_2="Nb of connection per week"
                        str_3="Nb of connection per month"
                        str_4="Nb of connection per year"
                        value_1={0}
                        value_2={0}
                        value_3={0}
                        value_4={0}
                    />

                    <BilanContentBox 
                        str_1="Total Sales"
                        str_2="Total Quantity"
                        str_3="Total Stock"
                        str_4="Best Seller"
                        value_1={0}
                        value_2={0}
                        value_3={0}
                        value_4={"product name"}
                    />

                </div>

                <div className='w-full flex flex-row items-center gap-4'>
                    
                    <BilanContentBox 
                        str_1="Very satisfied"
                        str_2="Good"
                        str_3="Neutral"
                        str_4="Unsatisfied"
                        value_1={0}
                        value_2={0}
                        value_3={0}
                        value_4={0}
                    />

                    <BilanContentBox 
                        str_1="Email per day"
                        str_2="Email per week"
                        str_3="Email per month"
                        str_4="Email per year"
                        value_1={0}
                        value_2={0}
                        value_3={0}
                        value_4={0}
                    />

                </div>

            </div>
        </div>
    )
};