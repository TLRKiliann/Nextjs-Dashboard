"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

type MyComponentProps = {};

const MyComponent: React.FC<MyComponentProps> = () => {
    const map = useMap();

    useEffect(() => {
        console.log('map center:', map.getCenter());
    }, [map]);

    return null;
}

const MapChart: React.FC = () => {

    const mapCenter: [number, number] = [46.5197, 6.6323];
    const mapZoom: number = 13;

    return (
        <MapContainer center={mapCenter} zoom={mapZoom} className="w-full h-full" style={{border: "none"}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MyComponent />
        </MapContainer>
    );
}
export default MapChart;