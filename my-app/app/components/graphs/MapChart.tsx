"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MyComponent() {
    const map = useMap();

    useEffect(() => {
        console.log('map center:', map.getCenter());
    }, [map]);

    return null;
}

export default function MapChart() {
    return (
        <MapContainer center={[46.5197, 6.6323]} zoom={13} className="w-full h-full">
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MyComponent />
        </MapContainer>
    );
}
//style={{ height: "100vh", width: "100%" }}