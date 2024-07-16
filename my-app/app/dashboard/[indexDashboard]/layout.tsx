import { Metadata } from 'next';
import { ProductsProps } from '@/lib/definitions';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/prisma';
import DataTables from '@/components/DataTables';
import ProfilePage from "@/app/(auth)/profile/page";
import EmailsAdmin from '@/components/header-items/EmailsAdmin';
import ModifyProduct from '@/components/menu-items/admin-products/ModifyProduct';
import CreateProduct from '@/components/menu-items/admin-products/CreateProduct';

type TitleParamsProps = {
    params: {
        indexDashboard: string;
    }
};

export const generateMetadata = async ({params}: TitleParamsProps): Promise<Metadata> => {
    const title = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(` - ${params.indexDashboard}`)
        }, 300);
    })
    return {
        title: `Dashboard ${title}`
    };
};

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
                        <div className='w-full h-[90vh] text-slate-500 mt-[10vh] p-4'>
                            <DataTables />
                        </div>
                    ) : params.indexDashboard === "charts" ? (
                        <div className='w-full h-[90vh] text-slate-500 mt-[10vh]'>
                            <DataTables />
                        </div>
                    ) : params.indexDashboard === "products-admin" ? (
                        <div className='w-full h-[90vh] text-slate-500 mt-[10vh] px-4 pt-2'>
                            <ModifyProduct listProducts={listProducts} />
                            <CreateProduct />
                        </div>
                    ) : params.indexDashboard === "emails-admin" ? (
                        <EmailsAdmin />
                    ) : null}
                    
                </div>
            </div>
        </div>
    )
}
