"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import userLogo from "@/public/assets/images/users/user_icon.png";

export default function Settings() {

    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [display, setDisplay] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setImage(selectedFile);
            setImageUrl(URL.createObjectURL(selectedFile));
        }
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (image) {
            const formData = new FormData();
            formData.append('image', image);

            const response = await fetch("/api/profile/settings", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data) {
                console.log("Image uploaded!");
                const res = await fetch("/api/profile/settings", {
                    method: "GET",
                })
                const result = await res.json();
                if (result) {
                    console.log("ok", result);
                    setDisplay(imageUrl);
                    setImage(null);
                    setImageUrl(null);
                }
            } else {
                console.error("Upload failed!");
            }
        } else {
            console.error("No file selected.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-row items-center justify-between mx-4 mt-4'>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" className="text-slate-50 bg-blue-500 hover:bg-blue-600 
                    active:bg-blue-700 px-4 py-1 rounded"
                >
                    Upload
                </button>
            </form>
            
            {imageUrl ? (
                <div className="relative flex items-center justify-center w-full h-auto mt-2">
                    <Image 
                        src={imageUrl} 
                        alt="Uploaded Image"
                        width={500}
                        height={333}
                        className='w-[100px] h-auto object-cover'/>
                </div>
            ) : null}

            <div className='w-full flex flex-col items-center justify-center rounded-lg p-4 shadow-whitecustom'>
                <div className="w-full h-full border border-slate-200 rounded-lg">
                    <div className='relative flex justify-end w-full h-auto bg-slate-100 rounded-tl-lg rounded-tr-lg'>
                        <Image 
                            src={display ? display : userLogo}
                            priority={false}
                            unoptimized={false}
                            alt="Uploaded Image" width={500} height={333} 
                            className='w-[100px] h-auto object-cover'
                        />
                    </div>
                </div>

                <div className="w-full flex flex-row items-center justify-between mt-4 bg-slate-100 border border-slate-200 rounded-lg px-2 py-1">
                    <li className="list-none text-blue-500 hover:text-blue-600 active:text-blue-700">
                        <Link href="/resetpassword">Reset Password</Link>
                    </li>
                    <li className="list-none text-blue-500 hover:text-blue-600 active:text-blue-700">
                        <Link href="/profile">Profile</Link>
                    </li>
                </div>
            </div>
        </>
    )
};