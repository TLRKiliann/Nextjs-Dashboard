'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import imgTropical from '@/public/assets/images/bg/tropical.jpg';
import imgWaterfall from '@/public/assets/images/bg/waterfall.jpg';
import greenTree from '@/public/assets/images/bg/green-tree.jpg';

export default function Carousel() {
    const images = [imgTropical, imgWaterfall, greenTree];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFade(true);
            }, 1000);
        }, 5000);
        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <div className="relative -z-10 bg-sky-700/20 flex items-start justify-start w-full h-full overflow-hidden">
            <Image
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className={`w-full h-full transition-opacity duration-500 ease-in-out ${fade ? 'opacity-30' : 'opacity-0'}`}
            />
        </div>
    );
}
