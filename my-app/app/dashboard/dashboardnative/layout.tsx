import React from 'react';
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardNativeLayout({children, tableone, squares, tabletwo}: {
    children: React.ReactNode;
    tableone: React.ReactNode;
    tabletwo: React.ReactNode;
    squares: React.ReactNode;
}) {

    const session = await auth();

    if (!session?.user) {
        return redirect("/api/auth/signin");
    }

    //const user = session?.user;
    return (
        <div className='flex flex-col w-full min-h-screen bg-slate-100'>

            <div className='flex flex-row w-full h-[100vh]'>

                {children}

                <div className="flex flex-col justify-center w-full h-full">

                    <div className='flex w-full h-[20%] text-slate-500/70 mt-[8%]'>
                        {squares}
                    </div>

                    <div className='flex items-center justify-evenly w-full h-[70%] pt-2 pb-6'>

                        <div className='flex w-[45%] h-full text-slate-500/80 bg-slate-50 
                            p-4 shadow-sm-out rounded-lg'>
                            {tableone}
                        </div>

                        <div className='flex w-[45%] h-full text-slate-500/80 bg-slate-50 
                            p-4 shadow-sm-out rounded-lg'>
                            {tabletwo}
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}
