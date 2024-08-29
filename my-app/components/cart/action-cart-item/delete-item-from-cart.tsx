"use client";

import usePersistStore from '@/helpers/usePersistStore';
import { deleteFromCart } from '@/lib/actions/cart';
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
                className="group w-[40px] h-[40px] text-base font-bold transform transition duration-100 ease-in-out disabled:opacity-50 text-slate-100 bg-blue-500 hover:scale-105 hover:text-lg hover:bg-blue-600/90 active:scale-95 active:bg-blue-600 rounded-full shadow-sm-out-light"
                disabled={stock === quantity ? true : false}
                aria-label={`Delete one more ${name}`}
            >
                <span className="transform duration-100 ease-in-out group-hover:scale-105">⬇</span>
            </button>
        </div>
    )
}
