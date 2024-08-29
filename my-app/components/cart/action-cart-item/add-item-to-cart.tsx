"use client";

import usePersistStore from '@/helpers/usePersistStore';
import { addToCart } from '@/lib/actions/cart';
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
                className="group w-[40px] h-[40px] font-bold transform duration-100 ease-in-out disabled:opacity-50 text-slate-100 bg-blue-500 hover:scale-105 hover:text-lg hover:bg-blue-600/90 active:scale-95 active:bg-blue-600 rounded-full shadow-sm-out-light"
                aria-label={`Add one ${name}`}
                disabled={stock === 0 ? true : false}
            >
                <span className="transform duration-100 ease-in-out group-hover:scale-105">⬆</span>
            </button>
        </div>
    )
};
