//import { useState } from "react";
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react'
import { Toaster } from "react-hot-toast";
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import { Inter } from "next/font/google";
//import Header from "@/components/Header";
import "./globals.css";

//const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  //const [queryClient] = useState(() => new QueryClient());
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>
          {/* <QueryClientProvider client={queryClient}> */}
            <Toaster position="bottom-center" />
            <main>
              {children}
            </main>
          {/* </QueryClientProvider> */} 
        </body>
      </html>
    </SessionProvider>
  );
}
