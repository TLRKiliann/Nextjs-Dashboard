import { Metadata } from 'next';
import { ProductsProps } from '@/lib/definitions';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/prisma';
import Network from '@/components/Network';
import EmailsAdmin from '@/components/header-items/EmailsAdmin';
import ModifyProduct from '@/components/menu-items/admin-products/ModifyProduct';
import CreateProduct from '@/components/menu-items/admin-products/CreateProduct';
import AllUserProfiles from '@/components/menu-items/all-user-profiles';
import GraphCharts from '@/components/GraphCharts';

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

                    {params.indexDashboard === "profiles" ? (
                        <div className='w-full h-[90vh] text-slate-500 mt-[10vh] p-4'>
                            <AllUserProfiles />
                        </div>
                    ) : params.indexDashboard === "network" ? (
                        <div className='w-full h-[90vh] text-slate-500 mt-[10vh] p-4'>
                            <Network />
                        </div>
                    ) : params.indexDashboard === "charts" ? (
                        <div className='w-full h-[90vh] text-slate-500 mt-[10vh]'>
                            <GraphCharts />
                        </div>
                    ) : params.indexDashboard === "products-admin" ? (
                        <div className='w-full h-[90vh] text-slate-500 mt-[10vh] p-4 pt-2'>
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
