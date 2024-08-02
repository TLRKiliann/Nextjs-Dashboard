"use client";

import usePersistStore from '@/helpers/usePersistStore';
import { addToCart } from '@/lib/actions';
import { useStore } from '@/stores/store';
import toast from 'react-hot-toast';

export default function AddItemToCart({ id, name, stock }: 
    {
        id: number;
        name: string;
        stock: number;
    }) {

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <h2>Loading...</h2>
    };

    return (
        <div key={id}>
            <button 
                type="button"
                onClick={async () => {
                    const res = await addToCart({id});
                    store.increaseQuantity(id);

                    if (res?.validationErrors) {
                        toast.error("Add to cart failed!");
                    };
                    if (res?.serverError) {
                        toast.error("An unexpected error occurred.");
                    };

                    toast.success("Successfully added to cart!");
                }}
                className="w-[38px] h-[38px] text-slate-100 font-bold bg-blue-500 
                    hover:bg-blue-600/90 active:bg-blue-600
                    rounded-full shadow-sm-out disabled:opacity-50"
                aria-label={`Add one ${name}`}
                disabled={stock === 0 ? true : false}
            >
                +
            </button>
        </div>
    )
};
