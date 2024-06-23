"use client";

//import React, { useEffect } from 'react';
import { TileLayer } from 'react-leaflet/TileLayer';
import { MapContainer } from 'react-leaflet/MapContainer';
import { useMapEvents } from 'react-leaflet/hooks';

import 'leaflet/dist/leaflet.css';

type MyComponentProps = {};

const MyComponent: React.FC<MyComponentProps> = () => {
    const map = useMapEvents({
        click: () => {
            map.locate()
        },
        locationfound: (location: number[]) => {
            console.log('location found:', location)
        },
    })
    return null
}

const MapChart: React.FC = () => {

    const mapOptions = {
        center: [46.5197, 6.6323],
        zoom: 13,
        maxZoom: 18,
        minZoom: 5,
    };

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