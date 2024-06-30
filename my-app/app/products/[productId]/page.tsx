import React from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProductsData } from "@/app/utils/api-request";
//import { notFound } from 'next/navigation';
import ProductIdCard from '@/app/components/products-and-cart/ProductIdCard';

export default async function ProductIdPage({params}: {params: {productId: string}}) {

    if (!parseInt(params.productId)) {
        //throw new Error("Error: id is not a number");
        console.log("RSC error: params id...");
    };

    if (parseInt(params.productId) < 1 || parseInt(params.productId) > 100) {
        //notFound();
        console.log("RSC error: this product doesn't exist");
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