import { Metadata } from 'next';
import React from 'react';

type ParamsProps = {
    params: {
        productName: string;
    }
};

export const generateMetadata = async ({params}: ParamsProps): Promise<Metadata> => {
    const title = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Prod: ${params.productName}`)
        }, 300)
    })
    return {
      title: `HW ${title}`
    }
};

export default function ProductNameLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
};
