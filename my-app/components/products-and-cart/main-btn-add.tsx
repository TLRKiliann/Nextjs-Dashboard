"use client";

import type { Product } from '@prisma/client';
import { addProductToDb } from "@/lib/actions";
import { useStore } from "@/stores/store";
import usePersistStore from '@/helpers/usePersistStore';
import toast from "react-hot-toast";

type MainBtnTypes = { 
    id: number; 
    name: string; 
    product: Product;
    quantity: number;
};

export default function MainBtnAdd({ id, name, product, quantity }: MainBtnTypes) {

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <h2>Loading...</h2>
    };

    const onSubmit = async (id: number) => {
        const res = await addProductToDb({id});
        store.addProducts(product);
        if (res.message === "Success!") {
            toast.success("Successfully add to cart!");
        } else if (res.message === "There is an error!") {
            toast.error("Error: prisma update!");
        } else {
            toast.error("An unexpected error occurred.");
        }
    };

    return (
        <form key={id} action={() => onSubmit(id)} className='flex items-center justify-center mt-4'>
            <button type="submit" 
                className='w-[120px] h-[38px] text-sm font-bold bg-blue-500 hover:bg-blue-600 
                    active:bg-blue-700 rounded disabled:opacity-50 m-auto'
                aria-label={`Add one more ${name}`}
                disabled={quantity === 1 ? true : false}
            >
                {quantity === 1 ? "Go to Cart ⬆" : "Add to Cart"}
            </button>
        </form>
    )
}
