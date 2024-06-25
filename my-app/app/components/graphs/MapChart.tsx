"use client";

import React, { useEffect, useState } from 'react';
import { TileLayer, MapContainer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type MapOptionsProps = {
    center: number[];
    zoom: number;
    maxZoom: number;
    minZoom: number;
    scrollWheelZoom: boolean;
}

type MyComponentProps = {};

const leafletUrl: string = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const getUndefined = () => typeof window !== 'undefined';

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

const MapChart: React.FC<{ latitude: number; longitude: number;}> = ({latitude, longitude}) => {

    const [mapOptions, setMapOptions] = useState<MapOptionsProps>({
        center: [latitude, longitude],
        zoom: 13,
        maxZoom: 18,
        minZoom: 5,
        scrollWheelZoom: true
    });

    useEffect(() => {
        if (getUndefined()) {
            setMapOptions({
                center: [latitude, longitude],
                zoom: 13,
                maxZoom: 18,
                minZoom: 5,
                scrollWheelZoom: true
            });
        };
        return () => console.log("clean-up");
    }, [latitude, longitude]);

    return (
        <MapContainer {...mapOptions} 
            style={{width: "100%", height: "100%", borderRadius: "7px"}}>
            <TileLayer
                /* attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' */
                url={leafletUrl}
            />
            <MyComponent />
        </MapContainer>
    )
}
export default MapChart;

