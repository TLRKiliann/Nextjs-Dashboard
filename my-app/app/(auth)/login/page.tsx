import { Metadata } from "next";
import React from "react";
import Login from "@/app/components/auth/login";

export const metadata: Metadata = {
    title: {
      absolute: "Login"
    },
    description: "login page"
};

export default function LoginPage() {
    return (
        <Login />
    )
};