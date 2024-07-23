"use client";

import { addProductToDb } from "@/lib/actions";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";

export default function MainBtnAdd({ id, name }: { 
    id: number;
    name: string;}) {

    const [count, setCount] = useState<number>(0);

    const onSubmit = useCallback(async (formData: FormData) => {
        const res = await addProductToDb(formData);
        setCount((prev) => prev += 1);
        if (res.message === "Success!") {
            toast.success("Successfully add to cart!");
        } else if (res.message === "There is an error!") {
            toast.error("Error: prisma update!");
        } else {
            toast.error("An unexpected error occurred.");
        }
    }, []);

    return (
        <form key={id} action={onSubmit} className='flex items-center justify-center mt-4'>
            <input type="number" id="id" name="id" value={id} readOnly hidden />
            <button type="submit" 
                className='w-[120px] h-[38px] text-sm font-bold bg-blue-500 hover:bg-blue-600 
                    active:bg-blue-700 rounded disabled:opacity-50 m-auto'
                aria-label={`Add one more ${name}`}
                //disabled={quantity > 0 ? true : false}
                disabled={count === 1 ? true : false}
            >
                {count === 1 ? "Go to Cart ⬆" : "Add to Cart"}
            </button>
        </form>
    )
}
