import type { Metadata } from 'next';
import Link from 'next/link';
import { NewPasswordForm } from '@/components/auth/new-password-form';
import HeaderAuth from '@/components/auth/header-auth';

export const metadata: Metadata = {
    title: "Reset Password",
    description: "reset password page"
};

const NewPasswordPage = () => {
    return (
        <>
            <HeaderAuth />
            <div className='flex flex-col items-center justify-center w-full'>
                <NewPasswordForm />
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
}
export default NewPasswordPage;