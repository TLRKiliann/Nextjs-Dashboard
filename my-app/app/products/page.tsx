import React from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProductsData } from "@/lib/actions";
import AllProducts from '@/components/AllProducts';

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
