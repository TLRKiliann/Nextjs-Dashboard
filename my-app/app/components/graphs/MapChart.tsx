"use client";

import React, { useEffect, useState } from 'react';
import { TileLayer } from 'react-leaflet/TileLayer';
import { MapContainer } from 'react-leaflet/MapContainer';
import { useMapEvents } from 'react-leaflet/hooks';
import 'leaflet/dist/leaflet.css';

type MyComponentProps = {};

const getUndefined = () => typeof window === 'undefined';

const MyComponent: React.FC<MyComponentProps> = () => {
    
    const map = useMapEvents({
        click: () => {
            map.locate();
        },
        locationfound: (location: { latlng: { lat: number; lng: number;} }) => {
            console.log('location found:', location.latlng);
        },
    });
    return null;
};

const MapChart: React.FC<{ latitude: number; longitude: number;}> = ({ latitude, longitude }) => {

    const [mapOptions, setMapOptions] = useState({
        center: [latitude, longitude],
        zoom: 13,
        maxZoom: 18,
        minZoom: 5,
    });

    useEffect(() => {
        if (getUndefined()) {
            setMapOptions({
                center: [latitude, longitude],
                zoom: 13,
                maxZoom: 18,
                minZoom: 5,
            });
        };
        return () => console.log("clean-up");
    }, [latitude, longitude]);

    return (
        <MapContainer {...mapOptions} className="w-full h-full">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent />
        </MapContainer>
    );
}
export default MapChart;