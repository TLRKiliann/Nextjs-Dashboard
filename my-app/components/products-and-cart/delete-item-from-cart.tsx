"use client";

import { deleteFromCart } from '@/lib/actions';

export default function DeleteItemFromCart({id, quantity, name, stock, handleDeleteProduct}:
    {
        id: number;
        quantity: number;
        name: string;
        stock: number;
        handleDeleteProduct: (id: number) => void;
    }) {

    return (
        <form action={deleteFromCart}>
            <input type="number" id="id" name="id" value={id} hidden readOnly />
            <button type="submit" onClick={() => handleDeleteProduct(id)}
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
