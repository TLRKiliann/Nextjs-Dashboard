import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProductsData } from "@/utils/api-request";
import ProductNameCard from '@/components/products-and-cart/ProductNameCard';

export default async function ProductIdPage({params}: {params: {productName: string}}) {

    if (!params.productName) {
        notFound();
    };

    // useQuery
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["products"],
        queryFn: getProductsData,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductNameCard params={params} />
        </HydrationBoundary>
    )
};