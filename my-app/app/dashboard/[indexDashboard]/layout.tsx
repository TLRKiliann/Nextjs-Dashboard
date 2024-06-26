import React from 'react';
import Profile from '@/app/components/menu-items/Profile';
import DataTables from '@/app/components/menu-items/DataTables';
import { notFound } from 'next/navigation';
import { customers } from '@/app/lib/datadb';
import Products from '@/app/components/menu-items/Products';
import CreateProduct from '@/app/components/menu-items/CreateProduct';

export default function DashboardIndexLayout({children, params}: {
    children: React.ReactNode;
    params: {indexDashboard: string};
}) {
    /*
    params = profile || databases || charts
    */
    return (
        <div className='flex flex-col w-full min-h-screen bg-slate-200'>

            <div className='flex flex-row w-full h-[100vh]'>
                
                {children}

                <div className="flex items-center justify-evenly w-full bg-slate-100">

                    {params.indexDashboard === "profile" ? (
                        <div className='flex w-[90%] h-4/5 text-slate-500 bg-slate-50 mt-[7%] 
                            p-4 shadow-out rounded-lg'>
                            <Profile customers={customers} />
                        </div>
                    ) : params.indexDashboard === "datatables" ? (
                        <div className='w-full h-[90%] text-slate-500 mt-[7%] p-4'>
                            <DataTables />
                        </div>
                    ) : params.indexDashboard === "charts" ? (
                        <div className='w-full h-[90%] text-slate-500 mt-[7%] p-4'>
                            <DataTables />
                        </div>
                    ) : params.indexDashboard === "products" ? (
                        <div className='w-full h-[90%] text-slate-500 mt-[7%] p-4'>
                            <Products />
                            <CreateProduct />
                        </div>
                    ) : (
                        <div>
                            {notFound()}
                        </div>
                    )}
                    
                </div>

            </div>

        </div>
    )
}
