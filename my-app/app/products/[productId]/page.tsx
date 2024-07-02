import React from 'react';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProductsData } from "@/utils/api-request";
import ProductIdCard from '@/components/products-and-cart/ProductIdCard';

export default async function ProductIdPage({params}: {params: {productId: string}}) {

    if (!parseInt(params.productId)) {
        throw new Error("Error: id is not a number");
    };

    if (parseInt(params.productId) < 1 || parseInt(params.productId) > 10) {
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
            <ProductIdCard params={params} />
        </HydrationBoundary>
    )
};