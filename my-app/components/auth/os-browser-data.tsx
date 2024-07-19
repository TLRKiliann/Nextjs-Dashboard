"use client";

import React, { useEffect, useState } from 'react';
import DataProfile from './data-profile';

const isBrowser = () => typeof window !== 'undefined';

export default function OsBrowserData() {

    const [browser, setBrowser] = useState<string | null>(null);
    const [ossystem, setOssystem] = useState<string | null>(null);

    //to avoid window is undefined
    useEffect(() => {
        if (isBrowser()) {
            setBrowser(window.navigator.userAgent);
            setOssystem(window.navigator.userAgent);
        };
        return () => console.log("clean-up");
    }, []);

    // write browser & os in json file
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/profile/browseros", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(browser),
            });
            const data = await res.json();
            if (data) {
                console.log("data ok", data)
            } else {
                console.error("data error");
            };
        }
        fetchData();
        return () => console.log("clean-up");
    }, [browser]);


    return (
        <>
            <DataProfile varDef="Browser:">
                {browser?.slice(57, 70)}
            </DataProfile>

            <DataProfile varDef="Os:">
                {ossystem?.slice(18, 30)}
            </DataProfile>
        </>
    )
}
