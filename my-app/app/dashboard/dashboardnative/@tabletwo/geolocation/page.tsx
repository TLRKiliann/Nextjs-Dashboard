import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import { readFile } from 'fs/promises';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ApiGeolocation } from '@/utils/api-request';
import TablePage from '@/components/TablePage';
import MapChart from '@/components/MapChart';
import Loader from '@/components/Loader';
import RefresherGeo from './RefresherGeo';

export const dynamic = "force-dynamic";

export default async function GeolocationPage() {

    const session = await auth();
    const user = session?.user;

    if (!user) {
        return redirect("/api/auth/signin");
    };

    const admin = await prisma.user.findUnique({
        where: {
            id: user.id,
            role: "ADMIN"
        }
    });

    if (!admin) {
        return redirect("/api/auth/signin");
    };

    const filenameIp = './utils/publicIp.json';
    const fileIp = await readFile(filenameIp, { encoding: 'utf8' });

    if (!fileIp) {
        return (
            <div className='relative flex flex-col items-center justify-center w-full h-full'>
                <p className='text-base text-orange-500 mb-4'>No ip selected !</p>
                <Link 
                    href="/dashboard/dashboardnative"
                    className='text-slate-50 font-bold transform duration-100 ease-in-out bg-blue-500 hover:scale-105 hover:bg-blue-600 active:scale-95 active:bg-blue-700 px-4 py-1 rounded'
                >
                    Go Back
                </Link>
            </div>
        )
    };

    let geoResult = null;

    if (fileIp) {
        const resultIp = JSON.parse(fileIp) as { ip: string };
        geoResult = await ApiGeolocation(resultIp.ip);
    };

    return (
        <TablePage title='Geolocation' url="/dashboard/dashboardnative" link="Sales">

            {geoResult ? (
                <div className='w-[98%] h-[80%] m-auto rounded-lg'>
                    <Suspense fallback={<Loader />}>
                        <MapChart latitude={geoResult.latitude} longitude={geoResult.longitude} />                        
                    </Suspense>
                </div>
            ): null}
            
            <RefresherGeo />

        </TablePage>
    )
};
