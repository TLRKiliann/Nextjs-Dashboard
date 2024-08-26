"use client";

import { User } from 'next-auth';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminAccessLink({user}: {user: User}) {

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
            <li className="list-none bg-gradient-to-bl from-blue-500/70 to-cyan-500 shadow rounded-md px-2 py-1">
                <Link 
                    href="/dashboard/dashboardnative"
                    className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-orange-600 hover:text-yellow-200 active:text-orange-300">
                        Dashboard
                </Link>
            </li>
        ) : null}
        </>
    )
};
