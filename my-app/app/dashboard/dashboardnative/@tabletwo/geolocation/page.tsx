import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { ApiGeolocation } from '@/utils/api-request';
import TablePage from '@/components/TablePage';
import MapChart from '@/components/MapChart';
import Loader from '@/components/Loader';

export const dynamic = "force-dynamic";

const isBrowser = () => typeof window !== "undefined";

export default async function GeolocationPage() {

    if (!isBrowser) {
        console.log("Pbm with window");
    } else {
        console.log("no pbm with window");
    };

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

    const resIp = await fetch("http://localhost:3000/api/dashboard/publicip");
    if (!resIp.ok) {
        throw new Error("No ip public detected");
    };
    const ipResult = await resIp.json();

    const geoResult = await ApiGeolocation(ipResult);
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