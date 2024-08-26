"use client";

import { signOut } from 'next-auth/react';
import React from 'react';
import { FaPowerOff } from "react-icons/fa6";

export default function BtnLogout() {
    const logoutAction = async () => {
        const response = await fetch("/api/auth/logout", {
            method: 'POST'
        });
        if (response.ok) {
            await signOut({
                redirect: true,
                callbackUrl: '/login',
            });
        } else {
            const data = await response.json();
            console.error(data.message);
        }
    };
    return (
        <form action={logoutAction} className='flex pr-4'>
            <li className='flex items-center justify-center text-base 
                transition duration-200 ease-in-out hover:text-slate-500'>
                <button type="submit">
                    <FaPowerOff size={16} />
                </button>
            </li>
        </form>
    )
};