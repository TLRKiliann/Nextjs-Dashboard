import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderAuth from '@/components/auth/header-auth';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
    title: "Register",
    description: "register page"
};

export default function RegisterPage() {
    return (
        <>
            <HeaderAuth />
            <div className='flex flex-col items-center justify-center w-full pt-10'>
                <RegisterForm />
                <div className="flex flex-col items-center justify-center">
                    <li className="list-none text-sm text-blue-600/80 hover:text-blue-700/80 active:text-blue-800 mt-4">
                        <Link href="/login">Already have an account ?</Link>
                    </li>
                    <li className="list-none text-sm text-blue-600/80 hover:text-blue-700/80 active:text-blue-800 mt-2">
                        <Link href="/resetpassword">Reset password ?</Link>
                    </li>
                </div>
            </div>
        </>
    )
}