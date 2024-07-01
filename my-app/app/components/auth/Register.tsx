'use client';

import { State } from "@/app/lib/definitions";
import { formSchemaRegister } from "@/app/lib/validation";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldPath, useForm } from "react-hook-form";
//import { useForm, SubmitHandler } from "react-hook-form";
import { useFormState, useFormStatus } from 'react-dom';
import { onRegisterFunc } from "@/app/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";

type FormValues = {
    username: string;
    password: string;
    email: string;
};

export default function Register() {

    const {register, formState: { errors }, setError } = useForm<FormValues>({
        mode: "all",
        resolver: zodResolver(formSchemaRegister), 
    });
    //const onSubmit: SubmitHandler<FormValues> = data => console.log(data);
    const { pending } = useFormStatus();
    const [state, formAction] = useFormState<State, FormData>(onRegisterFunc, null);

    const router = useRouter();

    useEffect(() => {
        if (!state) {
            return;
        }
        if (state.status === "error") {
            state.errors?.forEach((error) => {
                setError(error.path as FieldPath<FormValues>, {
                    message: error.message,
                });
            });
        }
        if (state.status === "success") {
            alert(state.message);
            router.push("/products");
        }
        return () => console.log("clean-up");
    }, [state, setError, router]);

    return (
        <form action={formAction} 
            className='w-[500px] h-auto bg-slate-50 p-4 rounded-lg shadow-xl'>

            <div className='w-full h-auto pt-3'>
                <h1 className='text-xl font-bold text-center'>Register</h1>
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
                        disabled={pending}
                        className='w-[70%] border border-blue-300 pl-3 py-1 rounded shadow-indarker'
                    />

                </div>

                <div className="-mt-2 mb-2">
                    <ErrorMessage name="username" errors={errors} />
                </div>

                <div className='w-[80%] flex flex-row items-center justify-between'>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email"

                        {...register("email", {
                            pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/i,
                            required: true, 
                                minLength: {
                                    value: 10,
                                    message: "min length is 10"
                                }
                        })}

                        placeholder="email" 
                        required 
                        autoComplete='off'
                        disabled={pending}
                        className='w-[70%] border border-blue-300 pl-3 py-1 rounded shadow-indarker'
                    />

                </div>

                <div className="mt-2 mb-2">
                    <ErrorMessage name="email" errors={errors} />
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
                        disabled={pending}
                        className='w-[70%] border border-blue-300 pl-3 py-1 rounded shadow-indarker'
                    />
                </div>

                <div className="mt-2 -mb-4">
                    <ErrorMessage name="password" errors={errors} />
                </div>

            </div>

            <div className='w-full h-auto flex items-center justify-center mb-8'>
                <button type="submit"
                    disabled={pending}
                    className='w-[80%] text-base font-bold text-slate-50 bg-blue-500 
                    hover:bg-blue-600 active:bg-blue-700 py-2 rounded shadow-lg'>
                    {pending ? "Pending..." : "Register"}
                </button>
            </div>

            <div className='w-[80%] h-auto m-auto flex flex-row items-center justify-between text-sm 
                text-blue-400'>
                <li className='list-none hover:text-blue-500 active:text-blue-600'>
                    <Link href="/login">Already registered ?</Link>
                </li>
                <li className='list-none hover:text-blue-500 active:text-blue-600'>
                    <Link href="/resetpassword">Forgot password ?</Link>
                </li>
            </div>
        </form>
    )
}
