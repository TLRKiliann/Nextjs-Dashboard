"use client";

import { addToCart } from '@/lib/actions';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

export default function AddItemToCart({id, name, handleAddProduct}: 
    {
        id: number;
        name: string;
        handleAddProduct: (id: number) => void;
    }) {

    const onSubmit = useCallback(async (formData: FormData) => {
        const res = await addToCart(formData);
        if (res.message === "Success!") {
            toast.success("Successfully added to cart!");
        } else if (res.message === "There is an error!") {
            toast.error("Error: add to cart failed!");
        } else {
            toast.error("An unexpected error occurred.");
        }
    }, []);

    return (
        <form action={onSubmit}>
            <input type="number" id="id" name="id" value={id} hidden readOnly />
            <button type="submit" onClick={() => handleAddProduct(id)}
                className="w-[38px] h-[38px] text-slate-100 font-bold bg-blue-500 
                    hover:bg-blue-600/90 active:bg-blue-600
                    rounded-full shadow-sm-out"
                aria-label={`Add one ${name}`}
            >
                +
            </button>
        </form>
    )
}
