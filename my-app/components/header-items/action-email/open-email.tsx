"use client";

import { openEmail } from '@/lib/actions';
import toast from 'react-hot-toast';
import { MdMarkEmailUnread } from 'react-icons/md';

export default function OpenEmail({id}: {id: string;}) {

    const revalidateEmail = async (id: string) => {
        const res = await openEmail(id);
        if (res.message === "Success!") {
            toast.success("Email opened !");
        } else if (res.message === "There is an error!") {
            toast.error("Error to open email");
        } else {
            toast.error("An error occured!");
        }
    };

    return (
        <button 
            type="button"
            onClick={() => revalidateEmail(id)}
            className='absolute text-sky-500 mr-8'>
            <MdMarkEmailUnread size={18} />
        </button>
    )
};
