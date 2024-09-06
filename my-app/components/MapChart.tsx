"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });

const leafletUrl: string = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const MyComponent: React.FC = () => {
    useMapEvents({
        click: (event: any) => {
            const pointerEvent = event.originalEvent as PointerEvent;
            console.log('Pointer pressure:', pointerEvent.pressure);
            console.log('Map clicked at:', event.latlng);
        },
        locationfound: (location: { latlng: { lat: number; lng: number; } }) => {
            console.log('Location found:', location.latlng);
        },
    });
    return null;
};

const MapChart: React.FC<{ latitude: number; longitude: number; }> = ({ latitude, longitude }) => {
    
    const [mapOptions, setMapOptions] = useState<{ center: number[]; zoom: number; } | null>(null);

    useEffect(() => {
        const callMap = () => {
            setMapOptions({
                center: [latitude, longitude],
                zoom: 13,
            });
        }
        callMap();
        return () => console.log("map updated");
    }, [latitude, longitude]);

    if (!mapOptions) {
        return null;
    };

    return (
        <MapContainer {...mapOptions} 
            style={{width: "100%", height: "100%", borderRadius: "7px"}}>
            <TileLayer
                url={leafletUrl}
            />
            <MyComponent />
        </MapContainer>
    );
};
export default MapChart;