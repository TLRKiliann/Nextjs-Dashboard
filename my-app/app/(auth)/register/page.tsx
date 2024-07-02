import { Metadata } from 'next';
import React from 'react';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
    title: "Register",
    description: "register page"
};

export default function RegisterPage() {
    return (
        <RegisterForm />
    )
}