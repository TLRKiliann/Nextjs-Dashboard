"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import userLogo from "@/public/assets/images/users/user_icon.png";

export default function UploadImage({userImg}: {userImg: string | undefined | null}) {

    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);


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
            const result = await response.json();
            if (result) {
              console.log("Image uploaded!");
              await fetch("/api/profile/settings", {
                method: "GET",
              })
              setImage(null);
              setImageUrl(null);

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
                    active:bg-blue-700 px-4 py-1 rounded">Upload</button>
            </form>
            
            {imageUrl ? (
                <div className="relative flex items-center justify-center w-full h-auto mt-2">
                    <Image 
                        src={imageUrl} 
                        alt="Uploaded Image"
                        width={500}
                        height={333}
                        className='w-[100px] h-auto object-fit'/>
                </div>
            ) : null}


            <div className='w-full flex flex-col items-center justify-center rounded-lg p-4 shadow-whitecustom'>

                <div className="w-full h-full border border-slate-200 rounded-lg">

                    <div className='relative flex justify-end w-full h-auto bg-slate-100 rounded-tl-lg rounded-tr-lg'>
                        <Image 
                            src={userImg ? userImg : userLogo}
                            alt="Uploaded Image" width={500} height={333} 
                            className='w-[100px] h-auto object-fit'
                        />
                    </div>

                </div>
            </div>
        </>
    )
};