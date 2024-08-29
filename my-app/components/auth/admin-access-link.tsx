"use client";

import { User } from 'next-auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAccessLink({user}: {user: User}) {

    const router = useRouter();

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const checkAdmin = async (): Promise<void> => {
            if (user?.email) {
                const response = await fetch('http://localhost:3000/api/auth/checkAdmin');
                const data = await response.json();
                setIsAdmin(data.isAdmin);
            }
        };
        checkAdmin();
        return () => console.log("clean-up check status");
    }, [user]);

    if (!user?.email || !isAdmin) {
        return null;
    };

    return (
        <>
        {isAdmin ? (
            <button 
                onClick={() => router.push("/dashboard/dashboardnative")} 
                className="list-none transform duration-200 ease-in-out bg-gradient-to-tr from-sky-500 to-sky-300 hover:from-sky-400 hover:to-sky-400 shadow hover:scale-105 active:shadow-none active:scale-95 rounded-md px-3 py-1">
                <span     
                    className="drop-shadow-sm-text">
                        Dashboard
                </span>
            </button>
        ) : null}
        </>
    )
};
