"use client";

//import { useAction } from "next-safe-action/hooks"
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

    //const { execute, result, isExecuting } = useAction((id) => addToCart(id))

    if (!store) {
        return <h2>Loading...</h2>
    };

    const onSubmit = async (id: number) => {
        const res = await addToCart({id});
        store.increaseQuantity(id);
        if (res.message === "Success!") {
            toast.success("Successfully added to cart!");
        } else if (res.message === "There is an error!") {
            toast.error("Insert to cart failed!");
        } else {
            toast.error("An unexpected error occurred.");
        }
    };

    return (
        <form key={id} action={() => onSubmit(id)}>
            <button type="submit"
                className="w-[38px] h-[38px] text-slate-100 font-bold bg-blue-500 
                    hover:bg-blue-600/90 active:bg-blue-600
                    rounded-full shadow-sm-out disabled:opacity-50"
                aria-label={`Add one ${name}`}
                disabled={stock === 0 ? true : false}
            >
                +
            </button>
        </form>
    )
};
