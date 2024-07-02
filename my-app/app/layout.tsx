"use client";

import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import { Inter } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

//const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Toaster position="bottom-center" />
          <main>
            {children}
          </main>
        </QueryClientProvider> 
      </body>
    </html>
  );
}
