import { auth } from "@/auth";
import React from 'react';
import { redirect } from "next/navigation";
import HeaderProducts from '@/components/products-and-cart/HeaderProducts';

export default async function ProductLayout({children}: {children: React.ReactNode}) {
    
    const session = await auth();

    if (!session?.user) {
        return redirect("/api/auth/signin");
    }
    
    return (
        <div>
            <HeaderProducts />
            {children}
        </div>
    )
}
