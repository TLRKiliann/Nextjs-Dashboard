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
            <li className="list-none text-lime-200 hover:text-lime-300 active:text-lime-400">
                <Link href="/dashboard/dashboardnative">Dashboard (admin)</Link>
            </li>
        ) : null}
        </>
    )
};
