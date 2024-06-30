import { Metadata } from "next";
import React from "react";
import Login from "@/app/components/auth/login";

export const metadata: Metadata = {
    title: {
      absolute: "Products"
    },
    description: "list of products"
};

export default function LoginPage() {
    return (
        <Login />
    )
};