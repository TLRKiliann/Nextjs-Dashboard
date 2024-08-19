"use client";

import Loader from "@/components/Loader";
import { Product } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export default function ProductsListPage() {

    const query = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const res = await fetch("/api/products");
            if (!res.ok) {
                throw Error(`Request failed with status code ${res.status}`);
            }
            return res.json();
        },
    });

    if (query.status === "pending") {
        return <Loader />
    };

    if (query.status === "error") {
        <p>Error occured while loading products!</p>
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen text-slate-400 bg-gradient-to-bl from-slate-900 to-cyan-950 px-10 py-4">
            {query.data?.map((prod: Product) => (
                <div key={prod.id}>
                    <div className="flex flex-row items-center justify-start py-4">
                        <p className="w-[50px]">{prod.id}</p>
                        <p className="w-[140px]">{prod.name}</p>
                        <p className="w-[140px]">{prod.family}</p>
                        <p className="w-[140px] text-orange-500">Stock: {prod.stock}</p>
                        <p className="w-[140px] text-cyan-400">Price: {prod.price}</p>
                        <p className="w-[200px]">Version: {prod.version}</p>
                    </div>
                    <hr className="border-solid border-slate-500"/>
                </div>
            ))}
        </div>
    )
};