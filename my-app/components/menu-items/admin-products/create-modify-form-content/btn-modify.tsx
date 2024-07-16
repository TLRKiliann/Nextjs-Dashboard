"use client";

import { handleModify } from '@/lib/actions';

type BtnModifyProps = {
    id: number;
    switcher: boolean;
}

export default function BtnModify({id, switcher}: BtnModifyProps) {
    return (
        <button 
            key={id}
            type="button"
            onClick={async () => (
                await handleModify(id, switcher)
            )} 
            className='flex items-center justify-center text-sm text-slate-50 bg-blue-500
                transition transform duration-100 ease-in-out 
                hover:bg-blue-500 active:bg-blue-600 px-4 py-2 rounded shadow-md
                hover:scale-105 active:scale-95 active:shadow-in'
        >
            Modify
        </button>
    )
}
