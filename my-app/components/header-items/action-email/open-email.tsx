"use client";

import { openEmail } from '@/lib/actions';
import toast from 'react-hot-toast';
import { MdMarkEmailUnread } from 'react-icons/md';

export default function OpenEmail({id}: {id: string;}) {
    return (
        <button 
            key={id}
            type="button"
            onClick={async () => {
                const value = await openEmail({id})

                if (value?.validationErrors) {
                    toast.error("Error to open message");
                };
                if (value?.serverError) {
                    toast.error("Server error !");
                };
                toast.success("Message opened !");
            }}
            className='absolute text-sky-500 hover:text-sky-600 active:text-sky-700 mr-8'>
            <MdMarkEmailUnread size={18} />
        </button>
    )
};
