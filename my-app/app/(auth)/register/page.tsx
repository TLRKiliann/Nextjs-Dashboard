import { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
    title: "Register",
    description: "register page"
};

export default function RegisterPage() {
    return (
        <>
            <RegisterForm />
            <div className="flex flex-col items-center justify-center">
                <li className="list-none text-sm text-blue-500 mt-4">
                    <Link href="/register">Already have an account ?</Link>
                </li>
                <li className="list-none text-sm text-blue-500 mt-2">
                    <Link href="/resetpassword">Forgot password ?</Link>
                </li>
            </div>
        </>
    )
}