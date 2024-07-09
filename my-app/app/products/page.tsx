import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProductsData } from '@/utils/api-request';
import AllProducts from '@/components/AllProducts';

export default async function ProductsPage() {  
  
  const session = await auth();

  if (!session?.user) {
      return redirect("/api/auth/signin");
  };

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
