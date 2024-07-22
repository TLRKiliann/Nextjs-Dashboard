"use client";

import { removeFromCart } from '@/lib/actions';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

//export default function RemoveItemsFromCart({id, name, handleRemoveAllProducts}:
export default function RemoveItemsFromCart({id, name}:
    {
        id: number;
        name: string;
        //handleRemoveAllProducts: (id: number) => void;
    }) {

    const onSubmit = useCallback(async (id: number) => {
        const res = await removeFromCart(id);
        if (res.message === "Success!") {
            toast.success("Successfully removed from cart!");
        } else if (res.message === "There is an error!") {
            toast.error("Delete item from cart failed!");
        } else {
            toast.error("An unexpected error occurred.");
        }
    }, [])

    return (
        <form key={id} action={() => onSubmit(id)}
            className='flex items-center justify-center'>
            <button type="submit" 
                //onClick={() => handleRemoveAllProducts(id)}
                className="text-slate-50 bg-red-500 hover:bg-red-600/90 active:bg-red-700
                    disabled:opacity-50 rounded-full shadow-sm-out px-4 py-1"
                aria-label={`Remove all ${name}`}
                disabled={!name ? true : false}
            >
                Remove
            </button>
        </form>
    )
}
