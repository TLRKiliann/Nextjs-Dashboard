import { ProductsProps } from '@/lib/definitions';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/prisma';
import DataTables from '@/components/menu-items/DataTables';
import ProfilePage from "@/app/(auth)/profile/page";
import ModifyProduct from '@/components/menu-items/ModifyProduct';
import CreateProduct from '@/components/menu-items/CreateProduct';

export default async function DashboardIndexLayout({children, params}: {
    children: React.ReactNode;
    params: {indexDashboard: string};
}) {
    //params = profile || databases || charts || ...
    
    const listProducts: ProductsProps[] = await prisma.product.findMany({
        orderBy: {
            id: "asc",
        }
    });

    if (!params.indexDashboard) {
        notFound();
    };
    
    return (
        <div className='flex flex-col w-full min-h-screen bg-slate-200'>

            <div className='flex flex-row w-full h-[100vh]'>
                
                {children}

                <div className="flex items-center justify-evenly w-full bg-slate-100">

                    {params.indexDashboard === "profile" ? (
                        <div className='flex w-[90%] h-4/5 text-slate-500 bg-slate-50 mt-[7%] 
                            p-4 shadow-out rounded-lg'>
                            <ProfilePage />
                        </div>
                    ) : params.indexDashboard === "datatables" ? (
                        <div className='w-full h-[90%] text-slate-500 mt-[7%] p-4'>
                            <DataTables />
                        </div>
                    ) : params.indexDashboard === "charts" ? (
                        <div className='w-full h-[90%] text-slate-500 mt-[7%] p-4'>
                            <DataTables />
                        </div>
                    ) : params.indexDashboard === "products-admin" ? (
                        <div className='w-full h-[90%] text-slate-500 mt-[7%] p-4'>
                            <ModifyProduct listProducts={listProducts} />
                            <CreateProduct />
                        </div>
                    ) : null}
                    
                </div>
            </div>
        </div>
    )
}
