import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import HeaderAuth from '@/components/auth/header-auth';
import NewPasswordForm from '@/components/auth/new-password-form';

export const metadata: Metadata = {
    title: "Reset Password",
    description: "reset password page"
};

export default function NewPasswordPage() {
    return (
        <>
            <HeaderAuth />
            <div className='flex flex-col items-center justify-center w-full'>
                <Suspense fallback={<h3>Loading...</h3>}>
                    <NewPasswordForm />
                </Suspense>        
                <div className="flex flex-col items-center justify-center">
                    <li className="list-none text-sm text-blue-600/80 hover:text-blue-700/80 active:text-blue-800 mt-4">
                        <Link href="/register">Back to register</Link>
                    </li>
                    <li className="list-none text-sm text-blue-600/80 hover:text-blue-700/80 active:text-blue-800 mt-2">
                        <Link href="/login">Back to login ?</Link>
                    </li>
                </div>
            </div>
        </>        
    );
};