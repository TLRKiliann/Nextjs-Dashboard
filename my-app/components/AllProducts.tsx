import prisma from '@/prisma/prisma';
import { Suspense } from 'react';
import Card from '@/components/products-and-cart/Card';
import Loader from '@/components/Loader';

export default async function AllProducts() {
    
    // useQuery is not recommanded with server action
    /* const { data, isLoading, isError, error } = useQuery<ProductsProps[]>({
        queryKey: ["products"],
        queryFn: () => getProductsData(),
        staleTime: 10 * 1000,
    }); */

    const products = await prisma.product.findMany({
        orderBy: {
            id: "asc",
        }
    });

    if (!products) {
        throw new Error("Error: useQuery + server action");
    };

    return (
        <div className='min-h-screen grid grid-cols-3 xl:grid-cols-4 grid-rows-3 bg-slate-100 gap-4 p-4 pt-24'>
            <Suspense fallback={<Loader />}>
                {products?.map((product) => (
                    <Card
                        key={product.id}
                        product={product}
                    /> 
                ))}
            </Suspense>
        </div>
    )
};