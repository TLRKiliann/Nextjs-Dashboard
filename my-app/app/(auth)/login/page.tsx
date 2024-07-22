import type { Metadata } from "next";
import Link from "next/link";
import HeaderAuth from '@/components/auth/header-auth';
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
    title: "Login",
    description: "login page"
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
    return (
        <>
            <HeaderAuth />
            <div className="flex flex-col items-center pt-10">
                <LoginForm />
                <div className="flex flex-col items-center justify-center">
                    <li className="list-none text-sm text-blue-600/80 hover:text-blue-700/80 active:text-blue-800 mt-4">
                        <Link href="/register">Don&apos;t have an account ?</Link>
                    </li>
                    <li className="list-none text-sm text-blue-600/80 hover:text-blue-700/80 active:text-blue-800 mt-2">
                        <Link href="/resetpassword">Forgot password ?</Link>
                    </li>
                </div>
            </div>        
        </>
    )
};