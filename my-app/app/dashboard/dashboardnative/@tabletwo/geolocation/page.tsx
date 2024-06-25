import React from 'react';
import { ApiPublicIp, ApiGeolocation } from '@/app/utils/api-request';
import TablePage from '@/app/components/TablePage';
import MapChart from '@/app/components/graphs/MapChart';
import ButtonGoBack from '@/app/components/ButtonGoBack';

export const dynamic = "force-dynamic";

export default async function GeolocationPage() {

    const ipResult = await ApiPublicIp();
    if (!ipResult) {
        console.error('Error fetching IP');
    } else {
        console.log('Public IP:', ipResult);
    }

    const geoResult = await ApiGeolocation(ipResult);
    if (!geoResult) {
        console.error('Error fetching IP');
    } else {
        console.log('geoResult ok');
    }

    return (
        <TablePage>
            <div className='h-[10%]'>
                <h2 className='text-xl'>Geolocation</h2>
            </div>
            
            {geoResult ? (
                <div className='w-[95%] h-[80%] m-auto rounded-lg'>
                    <MapChart latitude={geoResult.latitude} longitude={geoResult.longitude} />
                </div>
            ) : null}

            <ButtonGoBack text="Sales" />
        </TablePage>
    )
}
