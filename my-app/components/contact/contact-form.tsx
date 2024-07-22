"use client";

import { messageSender } from '@/lib/actions';
import { User } from 'next-auth';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactForm({user}: {user: User}) {

    const [textArea, setTextArea] = useState<string>("");

    const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setTextArea(event.target.value);
    };

    const onSubmit = useCallback(async (formData: FormData) => {
        const response = await messageSender(formData);
        if (response.message === "Success!") {
            toast.success("Your email was sent successfully!");
        } else if (response.message === "There is an error!") {
            toast.error("A problem has occurred when sending the e-mail!");
        } else {
            toast.error("An error as occured!");
        }
        setTextArea("");
    }, []);

    return (
        <form action={onSubmit}>
            <div className='mb-8'>
                <input
                    type="email"
                    id="src"
                    name="src"
                    value={user.email!}
                    readOnly
                    placeholder={user.email!}
                    className='form-control block w-full px-2 py-3 text-sm font-normal text-gray-700 
                        bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                        ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 
                        focus:outline-none'
                    required
                />
            </div>

            <div className='my-8'>
                <textarea name="message" id="message" cols={26} rows={8}
                    value={textArea}
                    onChange={(e) => handleTextArea(e)}
                    placeholder="Enter your message here..."
                    className='text-base font-normal text-gray-700  px-2 py-2 bg-white
                        border border-gray-300 focus:border-blue-600 focus:outline-none
                        placeholder:text-sm placeholder:text-slate-400 rounded'>
                </textarea>
            </div>

            <div className='w-full mb-8'>
                <button
                    type="submit"
                    className='w-full text-base font-bold text-slate-50 bg-blue-500 hover:bg-blue-600 
                        active:bg-blue-700 px-6 py-2 rounded shadow-lg active:shadow-none'
                >
                    Submit
                </button>
            </div>
        </form>
    )
};
