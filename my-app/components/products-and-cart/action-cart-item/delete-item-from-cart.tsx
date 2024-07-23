"use client";

import { deleteFromCart } from '@/lib/actions';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

export default function DeleteItemFromCart({id, quantity, name, stock}:
    {
        id: number;
        quantity: number;
        name: string;
        stock: number;
    }) {

    const onSubmit = useCallback(async (formData: FormData) => {
        const res = await deleteFromCart(formData)
        if (res.message === "Success!") {
            toast.success("Successfully deleted from cart!");
        } else if (res.message === "There is an error!") {
            toast.error("Deleted from cart failed!");
        } else {
            toast.error("An unexpected error occurred.");
        }
    }, []);

    return (
        <form action={onSubmit}>
            <input type="number" id="id" name="id" value={id} hidden readOnly />
            <button type="submit"
                className="w-[38px] h-[38px] text-slate-100 font-bold bg-blue-500 
                    hover:bg-blue-600/90 active:bg-blue-600 disabled:opacity-50 rounded-full shadow-sm-out"
                disabled={stock === quantity ? true : false}
                aria-label={`Delete one more ${name}`}
            >
                -
            </button>
        </form>
    )
}
