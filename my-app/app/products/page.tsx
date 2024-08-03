import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/prisma/prisma';
import type { Product } from '@prisma/client';
import AllProducts from '@/components/AllProducts';
import Loader from '@/components/Loader';
import { Suspense } from 'react';

export default async function ProductsPage() {

  const session = await auth();
  const user = session?.user;
  
  if (!user) {
    return redirect("/api/auth/signin");
  };

  const products: Product[] | null = await prisma.product.findMany({
    orderBy: {
      id: "asc"
    }
  });

  if (products.length === 0) {
    throw new Error("Error: prisma product fetch failed!");
  }

  return (
    <Suspense fallback={<Loader />}>
      <AllProducts products={products} user={user} />
    </Suspense>
  )
};
