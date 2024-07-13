"use client";

import { emailSending } from '@/lib/actions';
import React, { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

export default function EmailForm() {

    const [textEmail, setTextEmail] = useState<string>("");
    const [textArea, setTextArea] = useState<string>("");


    const handleTextEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTextEmail(event.target.value);
    };

    const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setTextArea(event.target.value);
    };

    const onSubmit = useCallback(async (formData: FormData) => {
        const response = await emailSending(formData);
        if (response.message === "Success!") {
            toast.success("Your email was sent successfully!");
        } else if (response.message === "There is an error!") {
            toast.error("A problem has occurred when sending the e-mail!");
        } else {
            toast.error("An error as occured!");
        }
    }, []);

    return (
        <form action={onSubmit}>
            <div>
                <label htmlFor=""></label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={textEmail}
                    onChange={(e) => handleTextEmail(e)}
                    placeholder='email@example.com'
                    required
                />
            </div>

            <div className='my-4'>
                <textarea name="message" id="message" cols={26} rows={10}
                    value={textArea}
                    onChange={(e) => handleTextArea(e)}
                    placeholder="Enter your message here..."
                    className='text-lg text-slate-600 px-2 py-1 bg-white
                        focus:bg-slate-50/10 placeholder:text-base placeholder:text-slate-400 rounded'>
                </textarea>
            </div>

            <div className='mb-4'>
                <button
                    type="submit"
                    className='text-base font-bold bg-blue-500 text-slate-50 px-6 py-2 rounded'
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
