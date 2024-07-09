import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import AllProducts from '@/components/AllProducts';
import Loader from '@/components/Loader';


export default async function ProductsPage() {  
  
  const session = await auth();

  if (!session?.user) {
      return redirect("/api/auth/signin");
  };

  /* const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProductsData,
  }); */
  
  return (
    <Suspense fallback={<Loader />}>
      <AllProducts />
    </Suspense>
  )
};
