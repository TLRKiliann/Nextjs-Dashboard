import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AllProducts from '@/components/AllProducts';
import { fetchDataFromApi } from '@/utils/api-request';
import Loader from '@/components/Loader';
import { Suspense } from 'react';

export default async function ProductsPage() {

  const session = await auth();
  const userSession = session?.user;
  
  if (!userSession) {
    return redirect("/api/auth/signin");
  };

  const products = await fetchDataFromApi();

  return (
    <Suspense fallback={<Loader />}>
      <AllProducts products={products} />
    </Suspense>
  )
};
