"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { CreateUserInput, createUserSchema } from "@/lib/user-schema";

export const RegisterForm = () => {
    const [submitting, setSubmitting] = useState<boolean>(false);

    const methods = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
    });

    const { handleSubmit, register, watch, formState: { errors } } = methods;

    const onSubmitHandler: SubmitHandler<CreateUserInput> = async (values) => {
        try {
            setSubmitting(true);
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const errorData = await res.json();
                if (Array.isArray(errorData.errors) && errorData.errors.length > 0) {
                    errorData.errors.forEach((error: any) => {
                        toast.error(error.message);
                    });
                    return;
                }
                toast.error(errorData.message);
                return;
            }
            signIn(undefined, {callbackUrl: "/"});
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setSubmitting(false);
        }
    };

  const input_style = 
    "form-control block w-full px-4 py-3 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none";

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full bg-slate-100/30 px-20 py-10 rounded-3xl">
            <div className="pb-6">
                <h2 className="text-lg font-bold text-slate-500">Register</h2>
            </div>
            <div className="mb-6">
                <input
                    {...register("name", {
                        pattern: /^[A-Za-z]+$/i,
                        required: true, 
                            minLength: {
                                value: 4,
                                message: "min length is 4"
                            }
                    })}
                    placeholder="Name"
                    className={`${input_style}`}
                />
                {errors["name"] && (
                <span className="text-red-500 text-xs pt-1 block">
                    {errors["name"]?.message as string}
                </span>
                )}
            </div>
            <div className="mb-6">
                <input
                    type="email"
                    {...register("email", {
                        required: true
                    })}
                    placeholder="Email address"
                    className={`${input_style}`}
                />
                {errors["email"] && (
                <span className="text-red-500 text-xs pt-1 block">
                    {errors["email"]?.message as string}
                </span>
                )}
            </div>
            <div className="mb-6">
                <input
                    type="password"
                    {...register("password", {
                        pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/i,
                        required: true, 
                            minLength: {
                                value: 8,
                                message: "min length is 10"
                            }
                    })}
                    placeholder="Password"
                    className={`${input_style}`}
                />
                {errors["password"] && (
                <span className="text-red-500 text-xs pt-1 block">
                    {errors["password"]?.message as string}
                </span>
                )}
            </div>
            <div className="mb-6">
                <input
                    type="password"
                    
                    {...register("passwordConfirm", {
                        required: true,
                        validate: (val: string) => {
                          if (watch('password') != val) {
                            return "Your passwords do no match";
                          }
                        },
                    })}

                    placeholder="Confirm Password"
                    className={`${input_style}`}
                />
                {errors["passwordConfirm"] && (
                <span className="text-red-500 text-xs pt-1 block">
                    {errors["passwordConfirm"]?.message as string}
                </span>
                )}
            </div>
            <button
                type="submit"
                style={{ backgroundColor: `${submitting ? "#ccc" : "#3446eb"}` }}
                className="inline-block px-7 py-4 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                disabled={submitting}
            >
                {submitting ? "loading..." : "Sign Up"}
            </button>
        </form>
    );
};
