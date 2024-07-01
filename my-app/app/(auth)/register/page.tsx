import { Metadata } from 'next';
import React from 'react';
import Register from '@/app/components/auth/Register';

export const metadata: Metadata = {
    title: "Register",
    description: "register page"
};

export default function RegisterPage() {
    return (
        <Register />
    )
}