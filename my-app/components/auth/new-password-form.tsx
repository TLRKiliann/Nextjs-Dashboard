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

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [submitting, setSubmitting] = useState<boolean>(false);

    const form = useForm<NewPasswordSchema>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    const { reset, handleSubmit, register, formState: { errors } } = form;

    const onSubmitHandler: SubmitHandler<NewPasswordSchema> = async (values) => {
        if (!token) {
            setError("Token is missing");
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            setSuccess("");
            const res = await fetch(`/api/newpassword?token=${token}`, {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                toast.success('Password reset successfully');
                router.push(callbackUrl);
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to reset password');
                setError(data.message || 'Failed to reset password');
                reset({ password: '' });
            }
        } catch (error: any) {
            toast.error(error.message);
            setError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
            <div className="space-y-4">
                <input 
                    type="password"
                    {...register("password", {
                        required: "Password is required"
                    })}
                    disabled={submitting}
                    placeholder="******"
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            {errors['password'] && (
                <span className='text-red-500 text-xs pt-1 block'>
                    {errors['password']?.message as string}
                </span>
            )}
            {error && (
                <span className='text-red-500 text-xs pt-1 block'>
                    {error}
                </span>
            )}

            {success && (
                <span className='text-red-500 text-xs pt-1 block'>
                    {success}
                </span>
            )}

            <button
                disabled={submitting}
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
            >
                Reset password
            </button>
        </form>
    );
};
