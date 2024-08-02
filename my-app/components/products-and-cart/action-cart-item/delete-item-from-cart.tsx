"use client";

import usePersistStore from '@/helpers/usePersistStore';
import { deleteFromCart } from '@/lib/actions';
import { useStore } from '@/stores/store';
import toast from 'react-hot-toast';

export default function DeleteItemFromCart({ id, quantity, name, stock }:
    {
        id: number;
        quantity: number;
        name: string;
        stock: number;
    }) {

    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <h2>Loading...</h2>
    };

    return (
        <div key={id}>
            <button 
                type="button"
                onClick={async () => {
                    const value = await deleteFromCart({id});
                    store.decreaseQuantity(id);
                    
                    if (value?.validationErrors) {
                        toast.error("Deleted from cart failed!");
                    };
                    if (value?.serverError) {
                        toast.error("An unexpected error occurred.");
                    }

                    toast.success("Successfully deleted from cart!");
                }}
                className="w-[38px] h-[38px] text-slate-100 font-bold bg-blue-500 
                    hover:bg-blue-600/90 active:bg-blue-600 disabled:opacity-50 rounded-full shadow-sm-out"
                disabled={stock === quantity ? true : false}
                aria-label={`Delete one more ${name}`}
            >
                -
            </button>
        </div>
    )
}
