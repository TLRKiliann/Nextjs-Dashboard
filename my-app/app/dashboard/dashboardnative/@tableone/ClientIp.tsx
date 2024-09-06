"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function ClientIp({ index, dataIpUser }: { index: number; dataIpUser: string; }) {
    const [ipData, setIpData] = useState<string | null>(null);

    const router = useRouter();

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
            router.push("/dashboard/dashboardnative/geolocation");
        };
        return () => console.log("ip-router clean-up");
    }, [ipData, router]);

    return (
        <form onSubmit={(e) => { 
            e.preventDefault();
            onSubmit(dataIpUser); 
        }}>
            <button
                type="submit"
                key={index} 
                className='text-xs text-orange-500 hover:text-orange-600 active:text-red-600'
            >
                {dataIpUser}
            </button>
        </form>
    )
};

