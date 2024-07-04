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
            setBrowser((prev) => prev = window.navigator.userAgent);
            setOssystem((prev) => prev = window.navigator.userAgent);
        };
        return () => console.log("clean-up");
    }, []);

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
