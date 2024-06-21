import React from 'react';
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";

export default function SquarePage() {
    return (
        <div className='flex flex-row items-center justify-evenly w-full'>
            
            <div className='flex w-[21%] h-[80%] bg-green-200 border-none rounded-lg shadow-out p-4'>
                <div className='flex flex-col justify-between w-full h-full'>
                    <h3>Earnings</h3>
                    <div className='flex flex-row items-end justify-end w-full h-[40px] mr-2'>
                        <GiReceiveMoney size={34} />
                        <p className='ml-2 text-base'>7777.-</p>
                    </div>
                </div>
            </div>

            <div className='w-[21%] h-[80%] bg-orange-200 border-none rounded-lg shadow-out p-4'>
                <div className='flex flex-col justify-between w-full h-full'>
                    <h3>Spend</h3>
                    <div className='flex flex-row items-end justify-end w-full h-[40px] mr-2'>
                        <GiPayMoney size={34} />
                        <p className='ml-2 text-base'>978.-</p>
                    </div>
                </div>
            </div>

            <div className='w-[21%] h-[80%] bg-cyan-200 border-none rounded-lg shadow-out p-4'>
                <div className='flex flex-col justify-between w-full h-full'>
                    <h3>Sales</h3>
                    <div className='flex flex-row items-end justify-end w-full h-[40px] mr-2'>
                        <GiTakeMyMoney size={34} />
                        <p className='ml-2 text-base'>1277pc</p>
                    </div>
                </div>
            </div>

            <div className='w-[21%] h-[80%] bg-fuchsia-200 border-none rounded-lg shadow-out p-4'>
                <div className='flex flex-col justify-between w-full h-full'>
                    <h3>Debts</h3>
                    <div className='flex flex-row items-end justify-end w-full h-[40px] mr-2'>
                        <GiMoneyStack size={34} />
                        <p className='ml-2 text-base'>0.-</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
