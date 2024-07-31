import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Payment Method",
    description: 'Generated by NextJS14',
};

export default function PaymentLayout({children} : {children: React.ReactNode}) {
    return (
        <>
            {children}
        </>
    )
};
