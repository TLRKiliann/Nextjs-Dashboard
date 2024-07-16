"use client";

import { closeEmail } from '@/lib/actions';
import toast from 'react-hot-toast';
import { MdMarkEmailRead } from 'react-icons/md';

export default function CloseEmail({id}: {id: string;}) {

    const revalidateEmail = async (id: string) => {
        const res = await closeEmail(id);
        if (res.message === "Success!") {
            toast.success("Email marked as unread!");
        } else if (res.message === "There is an error!") {
            toast.error("Error to mark email as unread!");
        } else {
            toast.error("An error occured!");
        }
    };

    return (
        <button 
            type="button"
            onClick={() => revalidateEmail(id)}
            className='absolute text-sky-500 hover:text-sky-600 active:text-sky-700 mr-8'>
            <MdMarkEmailRead size={16} />
        </button>
    )
};
