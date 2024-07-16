"use client";

import React, { useState } from 'react';

export default function UploadImage() {

    const [image, setImage] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            setImage(selectedFile);
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
            if (result.success) {
              console.log("img uploaded");
            } else {
              console.log("Upload failed");
            }
            
        } else {
            console.error("Aucun fichier sélectionné.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-row items-center justify-between mx-4 mt-4'>
            <input type="file" onChange={handleFileChange} />
            <button type="submit" className="text-slate-50 bg-blue-500 hover:bg-blue-600 
                active:bg-blue-700 px-4 py-1 rounded">Upload</button>
        </form>
    )
};