"use client";

import { messageSender } from '@/lib/actions/contact';
import { User } from 'next-auth';
import { useAction } from 'next-safe-action/hooks';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactForm({user}: {user: User}) {

    // next-safe-action
    const { execute } = useAction(messageSender, {
        onSuccess: () => {
            toast.success("Message sent successfully!");
            console.log("Message sent successfully!");
            setTextArea("");
        },
        onError: () => {
            toast.error("Error with message!");
            console.log("Error with message!");
        }
    });

    const [textArea, setTextArea] = useState<string>("");

    const handleTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setTextArea(event.target.value);
    };

    return (
        <form action={execute} className='flex flex-col items-center justify-between h-full text-slate-500'>

            <div className='mt-4'>
                <div className='flex flex-row items-center justify-center my-4 px-10'>
                    <label className="w-2/5" htmlFor="src">Send from:</label>
                    <input
                        type="email"
                        id="src"
                        name="src"
                        value={user.email ?? "user email"}
                        readOnly
                        placeholder={user.email ?? "user email"}
                        className='form-control block w-3/5 px-2 py-2 text-sm font-normal text-gray-700 
                            bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out focus:text-gray-700 focus:bg-white focus:border-cyan-700 
                            focus:outline-none'
                        required
                    />
                </div>

                <div className='flex flex-row items-center px-10'>
                    <label className="w-2/5" htmlFor="dst">Send to:</label>
                    <input
                        type="email"
                        id="dst"
                        name="dst"
                        readOnly
                        placeholder="admin@prisma.io"
                        className='form-control block w-3/5 px-2 py-2 text-sm font-normal text-gray-500/70 
                            bg-white bg-clip-padding border border-solid border-gray-300 rounded transition 
                            ease-in-out focus:text-gray-700 focus:bg-white focus:border-cyan-700 
                            focus:outline-none'
                        required
                    />
                </div>
            </div>

            <div>
                <textarea name="message" id="message" cols={30} rows={8}
                    value={textArea}
                    onChange={(e) => handleTextArea(e)}
                    placeholder="Enter your message here..."
                    className='text-base font-normal text-gray-700  px-2 py-2 bg-white
                        border border-gray-300 focus:border-cyan-700 focus:outline-none
                        placeholder:text-sm placeholder:text-slate-400 rounded'>
                </textarea>
            </div>

            <div className='w-full'>
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
