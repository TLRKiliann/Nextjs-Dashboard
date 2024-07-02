import { Metadata } from "next";
import React from "react";
import Login from "@/components/auth/Login";

export const metadata: Metadata = {
    title: "Login",
    description: "login page"
};

export default function LoginPage() {
    return (
        <Login />
    )
};