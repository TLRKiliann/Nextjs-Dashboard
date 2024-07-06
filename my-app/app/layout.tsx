"use client";

import { useState } from "react";
//import { session } from '@/auth';
import { SessionProvider } from 'next-auth/react'
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import { Inter } from "next/font/google";
import "./globals.css";

//const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider>
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
    </SessionProvider>
  );
}
