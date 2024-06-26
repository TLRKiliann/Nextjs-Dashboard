import React from 'react';
import Image from 'next/image';
import spinLoader from "@/public/assets/images/bg/loader.png";

export default function Loader() {
    return (
        <div className='m-auto'>
            <Image
                src={spinLoader}
                width={40}
                height={40}
                alt="img loader"
                className="w-[50px] h-[50px] animate-spin object-cover" 
            />
        </div>
    )
}