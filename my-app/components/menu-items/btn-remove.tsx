"use client";

import { handleRemove } from "@/lib/actions";

export default function BtnRemove({id}: {id: number}) {
    return (
        <button type="button" 
            onClick={() => handleRemove(id)}
            className='text-slate-100 bg-blue-500 
            hover:bg-blue-600 active:bg-blue-700
            px-4 py-1 rounded shadow-sm-out ml-4'
        >
            Delete
        </button>
    )
}
