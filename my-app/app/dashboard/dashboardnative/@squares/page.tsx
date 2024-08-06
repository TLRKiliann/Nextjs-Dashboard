import prisma from '@/prisma/prisma';
import React from 'react';
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";

type CartType = {
    quantity: number;
    stock: number;
    price: number;
};

export default async function SquarePage() {

    const sales: CartType[] | null = await prisma.cart.findMany({
        select: {
            quantity: true,
            stock: true,
            price: true
        }
    });

    if (sales.length === 0) {
        console.log("no expenses");
    };

    const calculationOfQuantity = sales.reduce((
        acc: number, prod: {quantity: number;}
    ) => acc + prod.quantity, 0);

    const calculationOfStock = sales.reduce((
        acc: number, prod: {stock: number; price: number;}
    ) => acc + (prod.stock * prod.price), 0);

    const calcPriceQuantity = sales.reduce((
        acc: number, prod: {quantity: number; price: number;}
    ) => acc + (prod.quantity * prod.price), 0);

    const earnings = calcPriceQuantity;

    // initial budget calculation
    const budget = calcPriceQuantity + calculationOfStock;

    // initial budget - sales
    const debts = budget - calcPriceQuantity;

    return (
        <div className='flex flex-row items-center justify-evenly w-full'>
            
            <div className='w-[21%] h-[80%] bg-green-200 rounded-lg shadow-square-green p-2 pt-3'>
                <div className='flex flex-col items-center justify-around w-full h-full'>

                    <div className='flex items-end justify-center w-full rounded-full'>
                        <GiReceiveMoney size={48} className="bg-gradient-to-br
                            from-green-200 from-10% to-green-400/70 to-90% shadow-green
                            rounded-full p-1" />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <p className='text-xl text-slate-500/80 font-bold'>{calcPriceQuantity}.-</p>
                        </div>
                        <div>
                            <h6 className='text-sm text-slate-500/80'>Sales</h6>
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-[21%] h-[80%] bg-orange-200 rounded-lg shadow-square-orange p-2 pt-3'>
                <div className='flex flex-col items-center justify-around w-full h-full'>

                    <div className='flex items-end justify-center w-full rounded-full'>
                        <GiPayMoney size={48} className="bg-gradient-to-br
                            from-orange-200 from-10% to-orange-400/50 to-90% shadow-orange
                            rounded-full p-1" />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <p className='text-xl text-slate-500/80 font-bold'>{budget}.-</p>
                        </div>
                        <div>
                            <h6 className='text-sm text-slate-500/80'>Investment</h6>
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-[21%] h-[80%] bg-cyan-200 rounded-lg shadow-square-cyan p-2 pt-3'>
                <div className='flex flex-col items-center justify-around w-full h-full'>

                    <div className='flex items-end justify-center w-full rounded-full'>
                        <GiTakeMyMoney size={48} className="bg-gradient-to-br
                            from-cyan-200 from-10% to-cyan-400/50 to-90% shadow-cyan
                            rounded-full p-1" />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <p className='text-xl text-slate-500/80 font-bold'>{calculationOfQuantity}pc</p>
                        </div>
                        <div>
                            <h6 className='text-sm text-slate-500/80'>Quantity</h6>
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-[21%] h-[80%] bg-fuchsia-200 rounded-lg shadow-square-fuchsia p-2 pt-3'>
                <div className='flex flex-col items-center justify-around w-full h-full'>

                    <div className='flex items-end justify-center w-full rounded-full'>
                        <GiMoneyStack size={48} className="bg-gradient-to-br
                            from-fuchsia-200 from-10% to-fuchsia-400/50 to-90% shadow-fuchsia
                            rounded-full p-1" />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div>
                            <p className='text-xl text-slate-500/80 font-bold'>{debts}.-</p>
                        </div>
                        <div>
                            <h6 className='text-sm text-slate-500/80'>Debts</h6>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
};
