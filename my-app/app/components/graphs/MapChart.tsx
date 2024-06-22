"use client";

//import React, { useEffect } from 'react';
import { TileLayer } from 'react-leaflet/TileLayer';
import { MapContainer } from 'react-leaflet/MapContainer';
import { useMapEvents } from 'react-leaflet/hooks';
import 'leaflet/dist/leaflet.css';

type MyComponentProps = {};

/* const MyComponent: React.FC<MyComponentProps> = () => {
    const map = useMap();

    useEffect(() => {
        console.log('map center:', map.getCenter());
    }, [map]);

    return null;
} */

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

    const mapCenter: number[] = [46.5197, 6.6323];
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