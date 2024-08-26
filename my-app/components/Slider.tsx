'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import imgTropical from '@/public/assets/images/bg/tropical.jpg';
import imgWaterfall from '@/public/assets/images/bg/waterfall.jpg';
import greenTree from '@/public/assets/images/bg/green-tree.jpg';

export default function Slider() {

    const images = [
        imgTropical,
        imgWaterfall,
        greenTree,
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="realtive -z-10 bg-cyan-500 flex items-start justify-start w-full h-full">
            <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full opacity-20 ease-in-out"
            />
      </div>
    )
}
