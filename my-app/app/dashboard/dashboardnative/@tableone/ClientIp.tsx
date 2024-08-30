"use client";

import React, { useState, useEffect } from 'react';

export default function ClientIp({ index, dataIpUser, dataUsername }: { index: number; dataIpUser: string; dataUsername: string; }) {
    const [ipData, setIpData] = useState<string | null>(null);

    const onSubmit = async (dataIpUser: string) => {
        const res = await fetch("/api/catchPublicIp", {
            method: "POST",
            body: JSON.stringify(dataIpUser),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!res.ok) {
            throw new Error("catchPublicIp failed!");
        };

        const data = (await res.json()) as string;
        console.log(data, "data from RCC");
        setIpData(data);
    };

    useEffect(() => {
        if (ipData) {
            console.log("Nouvelles données IP:", ipData);
        }
        return () => console.log("clean-up");
    }, [ipData]);

    return (
        <form onSubmit={(e) => { 
            e.preventDefault();
            onSubmit(dataIpUser); 
        }}>
            <button type="submit" key={index} className='text-xs'>{dataIpUser} - {dataUsername}</button>
        </form>
    )
};

