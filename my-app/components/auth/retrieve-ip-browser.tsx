"use client";

import React, { useEffect, useState } from 'react';
import DataProfile from './data-profile';

const isBrowser = () => typeof window !== 'undefined';

export default function OsBrowserData() {

    const [browser, setBrowser] = useState<string | null>(null);
    const [ossystem, setOssystem] = useState<string | null>(null);
    const [ip, setIp] = useState<string | null>(null);

    useEffect(() => {
        const callBrowIp = async () => {
            if (isBrowser()) {
                setBrowser(window.navigator.userAgent);
                setOssystem(window.navigator.userAgent);
            };
            try {
                const response = await fetch('https://jsonip.com/');
                const data = await response.json();
                setIp(data.ip);
            } catch (error) {
                console.error('Erreur lors de la récupération de l\'IP:', error);
            }
        }
        callBrowIp();
        return () => console.log("clean-up");
    }, []);

    // write browser & os in json file
    useEffect(() => {
        const fetchData = async () => {
            if (browser && ip) {
                const res = await fetch("/api/profile/browseros", {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({browser, ip}),
                });
                const data = await res.json();
                if (data) {
                    console.log("data ok", data)
                } else {
                    console.error("data error");
                };
            }
        }
        fetchData();
        return () => console.log("clean-up");
    }, [browser, ip]);

    return (
        <>
            <DataProfile varDef="Browser:">
                {browser?.slice(57, 70)}
            </DataProfile>

            <DataProfile varDef="IP:">
                {ip}
            </DataProfile>

            <DataProfile varDef="Os:">
                {ossystem?.slice(18, 30)}
            </DataProfile>
        </>
    )
}
