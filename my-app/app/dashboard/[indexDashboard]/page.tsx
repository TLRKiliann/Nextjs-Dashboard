import { Metadata } from 'next';
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { Suspense } from 'react';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import Loader from '@/components/Loader';

export const metadata: Metadata = {
    title: "Dashboard (index)",
    description: "access accepted"
};

export default async function DashboardIndexPage() {

    const session = await auth();

    if (session?.user?.name !== "Admin User") {
        return redirect("/api/auth/signin");
    }

    return (
        <React.Fragment>
            <div className='absolute right-0 z-40 flex flex-row items-center w-[80%] xl:w-[86%] h-[10vh] 
                bg-slate-200 border-b border-slate-300/20 shadow-md'>
                <Suspense fallback={<Loader />}>
                    <Header />
                </Suspense>
            </div>

            <div className='flex-none w-[20%] xl:w-[14%] h-full bg-slate-800'>
                <Suspense fallback={<Loader />}>
                    <Menu />
                </Suspense>
            </div>
        </React.Fragment>
    )
};