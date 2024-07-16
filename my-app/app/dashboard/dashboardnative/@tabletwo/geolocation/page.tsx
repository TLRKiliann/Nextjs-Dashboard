import React, { Suspense } from 'react';
import { ApiPublicIp, ApiGeolocation } from '@/utils/api-request';
import TablePage from '@/components/TablePage';
import MapChart from '@/components/menu-items/graphs/MapChart';
import ButtonGoBack from '@/components/ButtonGoBack';
import Loader from '@/components/Loader';

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
