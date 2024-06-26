import React, { Suspense } from 'react';
import { ApiPublicIp, ApiGeolocation } from '@/app/utils/api-request';
import TablePage from '@/app/components/TablePage';
import MapChart from '@/app/components/graphs/MapChart';
import ButtonGoBack from '@/app/components/ButtonGoBack';
import Loader from '@/app/components/Loader';

export const dynamic = "force-dynamic";

export default async function GeolocationPage() {

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
        <TablePage>
            <div className='h-[10%]'>
                <h2 className='text-xl'>Geolocation</h2>
            </div>
            {geoResult ? (
                <Suspense fallback={<Loader />}>
                    <div className='w-[98%] h-[80%] m-auto rounded-lg'>
                        <MapChart latitude={geoResult.latitude} longitude={geoResult.longitude} />
                    </div>
                </Suspense>
            ): null}
            <ButtonGoBack text="Sales" />
        </TablePage>
    )
}
