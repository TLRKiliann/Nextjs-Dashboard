import type { Metadata } from 'next';
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
            <NewPasswordForm />
        </>
    );
}
export default NewPasswordPage;