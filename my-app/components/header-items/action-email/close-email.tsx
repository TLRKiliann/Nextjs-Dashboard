"use client";

import { closeEmail } from '@/lib/actions';
import toast from 'react-hot-toast';
import { MdMarkEmailRead } from 'react-icons/md';

export default function CloseEmail({id}: {id: string;}) {
    return (
        <button 
            key={id}
            type="button"
            onClick={async () => {
                const value = await closeEmail({id});
                if (value?.validationErrors) {
                    toast.success("Email marked as unread!");
                };
                if (value?.serverError) {
                    toast.error("An error occured!");
                };

                toast.success("Email marked as unread!");
            }}
            className='absolute text-sky-500 hover:text-sky-600 active:text-sky-700 mr-8'>
            <MdMarkEmailRead size={16} />
        </button>
    )
};
