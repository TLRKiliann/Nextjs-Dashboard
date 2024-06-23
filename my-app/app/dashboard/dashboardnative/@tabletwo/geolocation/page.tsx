//http://localhost:3000/dashboard/dashboardnative/geolocation

import React from 'react';
import TablePage from '@/app/components/TablePage';
import MapChart from '@/app/components/graphs/MapChart';
import { ApiPublicIp, ApiGeolocation } from '@/app/utils/api-request';
import Link from 'next/link';

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
        console.log('geoResult:', geoResult);
    }

    return (
        <TablePage>
            <div className='h-[10%] border'>
                <h2 className='text-xl'>Geolocation</h2>
            </div>

            <div className='w-full h-[80%]'>
                <MapChart latitude={geoResult.latitude} longitude={geoResult.longitude} />
            </div>

            <div className='flex items-end justify-end h-[10%] border'>
                <Link href="/dashboard/dashboardnative"
                    className='text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    Table 2 ?
                </Link>
            </div>
        </TablePage>
    )
}
