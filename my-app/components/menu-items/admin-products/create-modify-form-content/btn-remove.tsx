"use client";

import { handleRemove } from "@/lib/actions";
import toast from "react-hot-toast";

export default function BtnRemove({id}: {id: number}) {
    return (
        <>
            <input type="number" id="id" name="id" value={id} readOnly hidden />
            <button type="button" 
                onClick={async () => {
                    const res = await handleRemove({id});

                    if (res?.validationErrors) {
                        toast.error("Value error!");
                    }
                    if (res?.serverError) {
                        toast.error("Server error!");
                    }

                    toast.success("Removed successfully!");
                }} 
                className='flex items-center justify-center text-sm text-slate-50 bg-red-500
                transition transform duration-100 ease-in-out 
                hover:bg-red-500 active:bg-red-600 ml-4 px-4 py-2 rounded shadow-md
                hover:scale-105 active:scale-95 active:shadow-in'
            >
                Delete
            </button>
        </>
    )
}
