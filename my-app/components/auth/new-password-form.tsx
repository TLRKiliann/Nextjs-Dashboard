"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { NewPasswordSchema, newPasswordSchema } from "@/lib/user-schema";

export const NewPasswordForm = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/profile';
    const token = searchParams.get("token");
    
    console.log(token, "token value");

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);

    const form = useForm<NewPasswordSchema>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            newPassword: "",
        },
    });

    const { reset, handleSubmit, register, formState: { errors } } = form;

    const onSubmitHandler: SubmitHandler<NewPasswordSchema> = async (values) => {
        console.log('onSubmitHandler triggered');
        if (!token) {
            setError("Token is missing");
            return;
        };
        try {
            setSubmitting(true);
            setError("");
            setSuccess("");
            //const res = await fetch(`/api/newpassword`, {
            const res = await fetch(`/api/newpassword?token=${token}`, {
                method: "POST",
                body: JSON.stringify({ newPassword: values.newPassword }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                toast.success('Password reset successfully');
                setSuccess('Password reset successfully');
                reset();
                router.push(callbackUrl);
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to reset password');
                setError(data.message || 'Failed to reset password');
            }
        } catch (error: any) {
            toast.error(error.message);
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} 
            className="flex flex-col items-start justify-between w-[400px] h-auto bg-slate-50/30 px-10 pt-5 
                pb-8 rounded-2xl shadow-auth">

            <h2 className="text-3xl font-bold">Reset Password</h2>

            <div className="flex flex-col w-full mb-8">
                <label htmlFor="newpasswd" className="text-base text-blue-500/80 pt-4 pb-2">
                    New Password
                </label>
                <input 
                    id="newpasswd"
                    type="password"
                    {...register("newPassword")}
                    disabled={submitting}
                    placeholder="******"
                    className="form-control block w-full px-4 py-3 text-sm font-normal text-gray-700 
                        bg-white border border-solid border-gray-300 rounded 
                        transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
                        focus:border-blue-600 focus:outline-none"
                />
                {errors.newPassword && <span className='text-red-500 text-xs pt-1 block'>
                    {errors.newPassword.message}
                </span>}
            </div>

            {error && <span className='text-red-500 text-xs pt-1 block'>{error}</span>}
            {success && <span className='text-green-500 text-xs pt-1 block'>{success}</span>}

            <button
                type="submit"
                className='px-7 h-[48px] leading-snug bg-blue-600 text-white text-sm 
                    uppercase rounded shadow-md focus:shadow-lg focus:outline-none focus:ring-0 
                    hover:bg-blue-700 hover:shadow-lg active:bg-blue-800 active:shadow-lg transition 
                    duration-150 ease-in-out w-full'
                disabled={submitting}
            >
                Reset password
            </button>
        </form>
    );
};
