"use client";
//http://localhost:3000/dashboard/dashboardnative/geolocation
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TablePage from '@/app/components/TablePage';
import MapChart from '@/app/components/graphs/MapChart';

const isGeoLocation = () => typeof window !== 'undefined';

export default function GeolocationPage() {

    const router = useRouter();

    //Ref error: window is undefined !!!
    
    //const [geoLocation, setGeoLocation] = useState<string | undefined>(undefined);
    const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isGeoLocation()) {
            window.navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                if (result.state === 'granted') {
                    getCurrentLocation();
                } else if (result.state === 'prompt') {
                    getCurrentLocation();
                } else if (result.state === 'denied') {
                    setErrorMessage('Geolocation permission denied. Please enable location services for this site in your browser settings.');
                }
            });
        } else {
            setErrorMessage('Geolocation is not supported by this browser or not running in the browser environment.');
        }
        return () => {
            console.log("Clean-up");
        };
    }, []);

    const getCurrentLocation = () => {
        if (isGeoLocation()) {
            window.navigator.geolocation.getCurrentPosition(
                (position) => {
                    let latitude: number = position.coords.latitude;
                    let longitude: number = position.coords.longitude;
                    setLocation({ latitude, longitude });
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                },
                (error) => {
                    if (error.code === 1) {
                        setErrorMessage('User denied geolocation prompt');
                    } else {
                        console.error('Error getting geolocation:', error);
                    }
                }
            );
        } else {
            console.log("window error: undefined !");
        }
    };

    console.log(location?.latitude);
    console.log(location?.longitude);
    console.log(errorMessage)

    return (
        <TablePage>
            <div className='h-[10%] border'>
                <h2 className='text-xl'>Geolocation</h2>
            </div>

            <div className='w-full h-[80%]'>
                <MapChart />
            </div>

            <div className='flex items-end justify-end h-[10%] border'>
                <button type="button" onClick={() => router.back()} 
                    className='text-sm text-blue-400 hover:text-blue-500 active:text-blue-700'>
                    Table 2
                </button>
            </div>
        </TablePage>
    )
}
