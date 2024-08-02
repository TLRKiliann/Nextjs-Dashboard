"use client";

import { removeEmail } from '@/lib/actions';
import toast from 'react-hot-toast';
import { FaTrashCan } from 'react-icons/fa6';

export default function RemoveEmail({id}: {id: string;}) {
    return (
        <button
            key={id}
            type="button"
            onClick={async () => {
                const value = await removeEmail({id});

                if (value?.validationErrors) {
                    toast.error("Error to delete email");
                };
                if (value?.serverError) {
                    toast.error("An error occured!");
                };

                toast.success("Email deleted !");
            }}
            className='absolute text-rose-500 hover:text-rose-600 active:text-rose-700'>
            <FaTrashCan size={16} />
        </button>
    )
};
