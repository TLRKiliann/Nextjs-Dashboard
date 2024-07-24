import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import AllProducts from '@/components/AllProducts';
import Loader from '@/components/Loader';

export default async function ProductsPage() {
  
  const session = await auth();
  const userSession = session?.user;
  
  if (!userSession) {
    return redirect("/api/auth/signin");
  };

  return (
    <Suspense fallback={<Loader />}>
      <AllProducts />
    </Suspense>
  )
};
