import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { ApiPublicIp, ApiGeolocation } from '@/utils/api-request';
import TablePage from '@/components/TablePage';
import MapChart from '@/components/menu-items/graphs/MapChart';
import ButtonGoBack from '@/components/ButtonGoBack';
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

    const ipResult = await ApiPublicIp();
    if (!ipResult) {
        throw new Error("No ip public detected");
    } else {
        console.log("Public IP detected");
    }

    const geoResult = await ApiGeolocation(ipResult);
    if (!geoResult) {
        throw new Error("No geolocation available");
    } else {
        console.log("Geolocation available");
    }

    return (
        <TablePage title='Geolocation' url="" link="">

            {geoResult ? (
                <div className='w-[98%] h-[80%] m-auto rounded-lg'>
                    <Suspense fallback={<Loader />}>
                        <MapChart latitude={geoResult.latitude} longitude={geoResult.longitude} />                        
                    </Suspense>
                </div>
            ): null}
            <ButtonGoBack text="Sales" />
            
        </TablePage>
    )
}
