import { Metadata } from 'next';
import { NewPasswordForm } from '@/components/auth/new-password-form';

export const metadata: Metadata = {
    title: "Reset Password",
    description: "reset password page"
};

const NewPasswordPage = () => {
    return ( 
        <NewPasswordForm />
    );
}
export default NewPasswordPage;