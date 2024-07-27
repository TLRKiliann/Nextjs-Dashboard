import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AllProducts from '@/components/AllProducts';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchDataFromApi } from '@/utils/api-request';

const queryClient = new QueryClient();

export default async function ProductsPage() {
  
  const session = await auth();
  const userSession = session?.user;
  
  if (!userSession) {
    return redirect("/api/auth/signin");
  };

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: fetchDataFromApi,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllProducts />
    </HydrationBoundary>
  )
};
