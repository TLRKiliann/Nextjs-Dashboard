'use client';

import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { LoginUserInput, loginUserSchema } from '@/lib/user-schema';
import googleLogo from "@/public/assets/images/logo/google.png";
import githubLogo from "@/public/assets/images/logo/github.png";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || "/profile";

  const methods = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const { reset, handleSubmit, register, formState: { errors } } = methods;

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (values) => {
    try {
      setSubmitting(true);

      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        redirectTo: callbackUrl,
      });

      setSubmitting(false);

      if (!res?.error) {
        toast.success('successfully logged in');
        router.push(callbackUrl);
      } else {
        reset({ password: '' });
        const message = 'invalid email or password';
        toast.error(message);
        setError(message);
      }
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const input_style =
    'form-control block w-full px-4 py-3 text-sm font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none';

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="w-full bg-slate-50/30 px-14 pt-5 pb-10 rounded-2xl shadow-auth">
      <div className="pb-5">
          <h2 className="text-3xl font-bold">Login</h2>
      </div>
      {error && (
        <p className='text-center bg-red-300 py-4 mb-6 rounded'>{error}</p>
      )}
      <div className='mb-6'>
        <input
          type='email'
          {...register('email', {required: true})}
          placeholder='Email address'
          className={`${input_style}`}
        />
        {errors['email'] && (
          <span className='text-red-500 text-xs pt-1 block'>
            {errors['email']?.message as string}
          </span>
        )}
      </div>
      <div className='mb-6'>
        <input
          type='password'
          {...register('password', {
            pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/i,
            required: true, 
              minLength: {
                  value: 8,
                  message: "min length is 10"
              }
          })}
          placeholder='Password'
          className={`${input_style}`}
        />
        {errors['password'] && (
          <span className='text-red-500 text-xs pt-1 block'>
            {errors['password']?.message as string}
          </span>
        )}
      </div>
      <button
        type='submit'
        style={{ backgroundColor: `${submitting ? '#ccc' : '#3446eb'}` }}
        className='inline-block px-7 py-4 bg-blue-600 text-white text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full'
        disabled={submitting}
      >
        {submitting ? 'loading...' : 'Sign In'}
      </button>

      <div className='flex items-center my-4 before:flex-1 before:border-t before:border-slate-400 before:mt-0.5 after:flex-1 after:border-t after:border-slate-400 after:mt-0.5'>
        <p className='text-center text-slate-600/70 font-semibold mx-4 mb-0'>OR</p>
      </div>

      <a
        className='px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3'
        style={{ backgroundColor: '#3b5998' }}
        onClick={() => signIn('google', { callbackUrl })}
        role='button'
      >
        <Image
          className='pr-2 opacity-80'
          src={googleLogo}
          alt=''
          style={{ height: '2rem' }}
          width={40}
          height={40}
        />
        Continue with Google
      </a>
      <a
        className='px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center'
        style={{ backgroundColor: '#55acee' }}
        onClick={() => signIn('github', { callbackUrl })}
        role='button'
      >
        <Image
          className='pr-2'
          src={githubLogo}
          alt=''
          width={40}
          height={40}
        />
        Continue with GitHub
      </a>
    </form>
  );
};
