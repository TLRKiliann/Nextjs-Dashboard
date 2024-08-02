"use client";

import usePersistStore from '@/helpers/usePersistStore';
import { removeFromCart } from '@/lib/actions';
import { useStore } from '@/stores/store';
import toast from 'react-hot-toast';

export default function RemoveItemsFromCart({id, name}:
    {
        id: number;
        name: string;
    }) {
        
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <h2>Loading...</h2>
    };

    return (
        <div key={id}
            className='flex items-center justify-center'>
            <button 
                type="button"
                onClick={async () => {
                    const value = await removeFromCart({id});
                    store.removeAllById(id);
                    if (value?.validationErrors) {
                        toast.error("Delete item from cart failed!");
                    };
                    if (value?.serverError) {
                        toast.error("An unexpected error occurred.");
                    };

                    toast.success("Successfully removed from cart!");
                }}
                className="text-slate-50 bg-red-500 hover:bg-red-600/90 active:bg-red-700
                    disabled:opacity-50 rounded-full shadow-sm-out px-4 py-1"
                aria-label={`Remove all ${name}`}
                disabled={!name ? true : false}
            >
                Remove
            </button>
        </div>
    )
}
