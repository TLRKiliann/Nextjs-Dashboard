import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login",
    description: "login page"
};

export default function LoginPage() {
    return (
        <div className="flex flex-col">
            <LoginForm />
            <div className="flex flex-col items-center justify-center">
                <li className="list-none text-sm text-blue-500 mt-4">
                    <Link href="/register">Don&apos;t have an account ?</Link>
                </li>
                <li className="list-none text-sm text-blue-500 mt-2">
                    <Link href="/resetpassword">Forgot password ?</Link>
                </li>
            </div>
        </div>
    )
};