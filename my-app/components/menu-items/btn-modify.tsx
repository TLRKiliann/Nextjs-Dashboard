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
            onClick={() => handleModify(id, switcher)} 
            className='text-slate-100 bg-blue-500 
                hover:bg-blue-600 active:bg-blue-700
                px-4 py-1 rounded shadow-sm-out'
        >
            Modify
        </button>
    )
}
