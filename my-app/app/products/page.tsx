import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import prisma from '@/prisma/prisma';
import type { Product } from '@prisma/client';
import AllProducts from '@/components/AllProducts';
import Loader from '@/components/Loader';
import { Suspense } from 'react';

type ProductType = {
  family: string;
  name: string;
  quantity: number;
  price: number;
};

type UserCartType = {
  id: string;
  carts: ProductType[];
};

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

  if (!products) {
    throw new Error("No products in database!");
  };

  if (products.length === 0) {
    throw new Error("Error: prisma product fetch failed!");
  }

  const userCart: UserCartType | null = await prisma.user.findUnique({
    where: {
        id: user.id,
    },
    include: {
      carts: {
        select: {
          family: true,
          name: true,
          quantity: true,
          price: true
        } 
      }
    }
  });

  if (!userCart) {
      throw new Error("userCart not set!");
  };

  return (
    <Suspense fallback={<Loader />}>
      <AllProducts products={products} user={user} userCart={userCart} />
    </Suspense>
  )
};
