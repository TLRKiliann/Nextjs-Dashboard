import type { Metadata } from 'next';
import type { Product } from '@prisma/client';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/prisma';
import Network from '@/components/menu-items/Network';
import EmailsAdmin from '@/components/header-items/EmailsAdmin';
import ModifyProduct from '@/components/menu-items/admin-products/ModifyProduct';
import CreateProduct from '@/components/menu-items/admin-products/CreateProduct';
import AllUserProfiles from '@/components/menu-items/members/all-user-profiles';
import GraphCharts from '@/components/menu-items/GraphCharts';
import Bilan from '@/components/menu-items/Bilan';

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
    const listProducts: Product[] = await prisma.product.findMany({
        orderBy: {
            id: "asc",
        }
    });

    if (!params.indexDashboard) {
        notFound();
    };
    
    const styles = "w-full h-[90vh] text-slate-500 mt-[10vh]";

    return (
        <div className='flex flex-col w-full min-h-screen bg-slate-50'>

            <div className='flex flex-row w-full h-[100vh]'>
                
                {children}

                <div className="flex items-center justify-evenly w-full">

                    {params.indexDashboard === "profiles" ? (
                        <div className={`${styles} p-4`}>
                            <AllUserProfiles />
                        </div>
                    ) : params.indexDashboard === "network" ? (
                        <div className={`${styles} bg-slate-700 p-4`}>
                            <Network />
                        </div>
                    ) : params.indexDashboard === "charts" ? (
                        <div className={`${styles}`}>
                            <GraphCharts />
                        </div>
                    ) : params.indexDashboard === "bilan" ? (
                        <div className={`${styles} p-4`}>
                            <Bilan />
                        </div>
                    ) : params.indexDashboard === "products-admin" ? (
                        <div className={`${styles} py-2`}>
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
