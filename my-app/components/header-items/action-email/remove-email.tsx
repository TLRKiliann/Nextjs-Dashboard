"use client";

import { removeEmail } from '@/lib/actions';
import toast from 'react-hot-toast';
import { FaTrashCan } from 'react-icons/fa6';

export default function RemoveEmail({id}: {id: string;}) {
    const revalidateEmail = async (id: string) => {
        const res = await removeEmail(id);
        if (res.message === "Success!") {
            toast.success("Email deleted !");
        } else if (res.message === "There is an error!") {
            toast.error("Error to delete email");
        } else {
            toast.error("An error occured!");
        }
    };

    return (
        <button 
            type="button"
            onClick={() => revalidateEmail(id)}
            className='absolute text-rose-500 hover:text-rose-600 active:text-rose-700'>
            <FaTrashCan size={16} />
        </button>
    )
};
