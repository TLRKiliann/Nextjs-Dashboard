"use client";

//import { useAction } from "next-safe-action/hooks"
import { addToCart } from '@/lib/actions';
import toast from 'react-hot-toast';

//export default function AddItemToCart({id, name, handleAddProduct}:
export default function AddItemToCart({ id, name, stock }: 
    {
        id: number;
        name: string;
        stock: number;
        //handleAddProduct: (id: number) => void;
    }) {

    //const { execute, result, isExecuting } = useAction((id) => addToCart(id))

    const onSubmit = async (id: number) => {
        const res = await addToCart({id});
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
