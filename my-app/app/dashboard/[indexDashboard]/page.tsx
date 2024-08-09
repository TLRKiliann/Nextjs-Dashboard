import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import React, { Suspense } from 'react';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import Loader from '@/components/Loader';

export default async function DashboardIndexPage() {

    const session = await auth();

    const user = session?.user;

    if (!user) {
        return redirect("/api/auth/signin");
    };

    const admin = await prisma.user.findUnique({
        where: {
            id: user.id,
            role: "ADMIN",
        }
    });

    if (!admin) {
        return redirect("/api/auth/signin");
    };

    return (
        <React.Fragment>
            <div className='absolute right-0 z-40 flex flex-row items-center w-[80%] xl:w-[86%] h-[10vh] 
                bg-gradient-to-r from-slate-900 to-cyan-900 border-b border-slate-300/20 shadow-md'>
                <Suspense fallback={<Loader />}>
                    <Header />
                </Suspense>
            </div>

            <div className='flex-none w-[20%] xl:w-[14%] h-full bg-gradient-to-bl from-slate-900 to-cyan-950'>
                <Suspense fallback={<Loader />}>
                    <Menu />
                </Suspense>
            </div>
        </React.Fragment>
    )
};