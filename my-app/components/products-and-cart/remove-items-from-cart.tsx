"use client";

import { removeFromCart } from '@/lib/actions';

export default function RemoveItemsFromCart({id, name, handleRemoveAllProducts}:
    {
        id: number;
        name: string;
        handleRemoveAllProducts: (id: number) => void;
    }) {

    return (
        <form key={id} action={() => removeFromCart(id)}
            className='flex items-center justify-center'>
            <button type="submit" onClick={() => handleRemoveAllProducts(id)}
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
