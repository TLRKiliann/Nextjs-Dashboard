"use client";

import usePersistStore from '@/helpers/usePersistStore';
import { removeFromCart } from '@/lib/actions/cart';
import { useStore } from '@/stores/store';
import toast from 'react-hot-toast';
import { FaTrashCan } from 'react-icons/fa6';

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
                        toast.error("Remove item from cart failed!");
                    };
                    if (value?.serverError) {
                        toast.error("An unexpected error occurred.");
                    };

                    toast.success("Successfully removed from cart!");
                }}
                className="group transform duration-100 ease-in-out disabled:opacity-50 text-slate-50 bg-red-500 hover:bg-red-600/90 hover:scale-105 hover:text-lg active:bg-red-700 active:scale-95 rounded-full shadow-sm-out-light p-3"
                aria-label={`Remove all ${name}`}
                disabled={!name ? true : false}
            >
                <FaTrashCan className="transform duration-100 ease-in-out group-hover:scale-105" size={16} />
            </button>
        </div>
    )
}
