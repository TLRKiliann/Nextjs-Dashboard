"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function ReactQueryProvider({children}: {children: React.ReactNode}) {
    //const [queryClient] = useState(new QueryClient);
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    )
}