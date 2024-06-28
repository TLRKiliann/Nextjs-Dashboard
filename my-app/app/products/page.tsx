import type { Metadata } from 'next';
import React from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProductsData } from "@/app/utils/api-request";
import AllProducts from '@/app/components/AllProducts';

export const metadata: Metadata = {
  title: {
    absolute: "Products"
  },
  description: "list of products"
};
  
export default async function ProductsPage() {  

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProductsData,
  });
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllProducts />
    </HydrationBoundary>
  )
};
