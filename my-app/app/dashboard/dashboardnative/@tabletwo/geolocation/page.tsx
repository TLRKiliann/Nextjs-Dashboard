import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import { readFile } from 'fs/promises';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { ApiGeolocation } from '@/utils/api-request';
import TablePage from '@/components/TablePage';
import RefresherGeo from './RefresherGeo';
import MapChart from '@/components/MapChart';
import Loader from '@/components/Loader';

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
        return <RefresherGeo />
    };

    const dataIp: string = JSON.parse(fileIp);

    const geoResult = await ApiGeolocation(dataIp);
    if (!geoResult) {
        throw new Error("No geolocation available");
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
            
        </TablePage>
    )
};