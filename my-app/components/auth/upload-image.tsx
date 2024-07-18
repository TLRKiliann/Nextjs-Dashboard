"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function UploadImage() {

    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    console.log(imageUrl, "imageUrl")

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

            const response = await fetch("/api/imgupload", {
                method: "POST",
                body: formData,
            });
            const result = await response.json();
            if (result) {
              console.log("Image uploaded!");
              await fetch("/api/imgupload", {
                method: "GET",
              })
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
                <div className="flex items-center justify-center mt-2">
                    <Image src={imageUrl} alt="Uploaded Image" width={200} height={100} className='w-[100px] h-auto object-fit'/>
                </div>
            ) : null}
        </>
    )
};