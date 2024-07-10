"use client";

import { addToCart } from '@/lib/actions';

export default function AddItemToCart({id, name, handleAddProduct}: 
    {
        id: number;
        name: string;
        handleAddProduct: (id: number) => void;
    }) {

    return (
        <form action={addToCart}>
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
