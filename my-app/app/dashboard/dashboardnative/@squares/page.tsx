import React from 'react';
import { GiReceiveMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiMoneyStack } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";

export default function SquarePage() {
    return (
        <div className='flex flex-row items-center justify-evenly w-full'>
            
            <div className='w-[21%] h-[80%] bg-green-200 rounded-lg shadow-out p-2 pt-3'>
                <div className='flex flex-col items-center justify-around w-full h-full'>

                    <div className='flex items-end justify-center w-full rounded-full'>
                        <GiReceiveMoney size={48} className="bg-gradient-to-br from-green-400/70 from-10%
                            via-green-200 via-50% to-green-400/70 to-90% shadow-green
                            rounded-full p-1" />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div className="">
                            <p className='text-xl text-slate-500/80 font-bold'>7777.-</p>
                        </div>
                        <div>
                            <h6 className='text-sm text-slate-500/80'>Earnings</h6>
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-[21%] h-[80%] bg-orange-200 rounded-lg shadow-out p-2 pt-3'>
                <div className='flex flex-col items-center justify-around w-full h-full'>

                    <div className='flex items-end justify-center w-full rounded-full'>
                        <GiPayMoney size={48} className="bg-gradient-to-br from-orange-400/70 from-10%
                            via-orange-200 via-50% to-orange-400/70 to-90% shadow-orange
                            rounded-full p-1" />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div className="">
                            <p className='text-xl text-slate-500/80 font-bold'>978.-</p>
                        </div>
                        <div>
                            <h6 className='text-sm text-slate-500/80'>Spend</h6>
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-[21%] h-[80%] bg-cyan-200 rounded-lg shadow-out p-2 pt-3'>
                <div className='flex flex-col items-center justify-around w-full h-full'>

                    <div className='flex items-end justify-center w-full rounded-full'>
                        <GiTakeMyMoney size={48} className="bg-gradient-to-br from-cyan-400 from-10%
                            via-cyan-200 via-50% to-cyan-400 to-90% shadow-cyan
                            rounded-full p-1" />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div className="">
                            <p className='text-xl text-slate-500/80 font-bold'>1277pc</p>
                        </div>
                        <div>
                            <h6 className='text-sm text-slate-500/80'>Sales</h6>
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-[21%] h-[80%] bg-fuchsia-200 rounded-lg shadow-out p-2 pt-3'>
                <div className='flex flex-col items-center justify-around w-full h-full'>

                    <div className='flex items-end justify-center w-full rounded-full'>
                        <GiMoneyStack size={48} className="bg-gradient-to-br from-fuchsia-400/70 from-10%
                            via-fuchsia-200 via-50% to-fuchsia-400/70 to-90% shadow-fuchsia
                            rounded-full p-1" />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <div className="">
                            <p className='text-xl text-slate-500/80 font-bold'>0.-</p>
                        </div>
                        <div>
                            <h6 className='text-sm text-slate-500/80'>Debts</h6>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
