'use client';

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
//import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useFormState } from 'react-dom';
import { State, onSubmitFunc } from "@/app/lib/actions";

type FormValues = {
    username: string;
    password: string;
};

export default function Login() {

    const {register, formState: { errors }} = useForm<FormValues>();
    //const onSubmit: SubmitHandler<FormValues> = data => console.log(data);
    const [state, formAction] = useFormState<State, FormData>(onSubmitFunc, null)
    //const onSubmit = onSubmitFunc.bind(data);

    useEffect(() => {
        if (!state) {
            return;
        }
    
        if (state.status === "success") {
            alert(state.message);
        }
    }, [state]);

    return (
        <div className='w-full min-h-screen flex items-center justify-center text-base text-slate-800/70 
            bg-slate-100'>
            <form 
                action={formAction} 
                className='w-[500px] h-auto bg-slate-50 p-4 rounded-lg shadow-xl'>

                <div className='w-full h-auto pt-3'>
                    <h1 className='text-xl font-bold text-center'>Login</h1>
                </div>

                <div className='flex flex-col items-center justify-around w-full h-auto my-8'>
                    <div className='w-[80%] flex flex-row items-center justify-between mb-4'>
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username"

                            {...register("username", {
                                pattern: /^[A-Za-z]+$/i,
                                required: true, 
                                    minLength: {
                                        value: 4,
                                        message: "min length is 4"
                                    }
                            })}

                            placeholder="username" 
                            required 
                            autoComplete='off'
                            className='w-[70%] border border-blue-300 pl-3 py-1 rounded shadow-indarker'
                        />
                        
                        {errors.username && <p>{errors.username.message}</p>}

                    </div>
                    <div className='w-[80%] flex flex-row items-center justify-between'>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password"

                            {...register("password", {
                                required: true, 
                                    minLength: {
                                        value: 10,
                                        message: "min length is 10"
                                    }
                            })}
 
                            placeholder="password" 
                            required 
                            autoComplete='off'
                            className='w-[70%] border border-blue-300 pl-3 py-1 rounded shadow-indarker'
                        />
                        
                        {errors.password && <p>{errors.password.message}</p>}

                    </div>
                </div>

                <div className='w-full h-auto flex items-center justify-center my-8'>
                    <button type="submit" className='w-[80%] text-base font-bold text-slate-50 bg-blue-500 
                        hover:bg-blue-600 active:bg-blue-700 py-2 rounded shadow-lg'>
                        Submit
                    </button>
                </div>

                <div className='w-[80%] h-auto m-auto flex flex-row items-center justify-between text-sm 
                    text-blue-400'>
                    <li className='list-none hover:text-blue-500 active:text-blue-600'>
                        <Link href="/register">Not registered</Link>
                    </li>
                    <li className='list-none hover:text-blue-500 active:text-blue-600'>
                        <Link href="/register">Password forget</Link>
                    </li>
                </div>

            </form>
        </div>
    )
}
