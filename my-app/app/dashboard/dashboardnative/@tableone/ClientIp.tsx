"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function ClientIp({ index, dataIpUser }: { index: number; dataIpUser: string; }) {
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
        setIpData(data);
        toast.success("IP catched !");
    };

    useEffect(() => {
        if (ipData) {
            console.log("New IP:", ipData);
        }
        return () => console.log("clean-up");
    }, [ipData]);

    return (
        <form onSubmit={(e) => { 
            e.preventDefault();
            onSubmit(dataIpUser); 
        }}>
            <button type="submit" key={index} className='text-xs text-orange-500'>{dataIpUser}</button>
        </form>
    )
};

