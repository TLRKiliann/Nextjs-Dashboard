import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
      default: "Order",
      template: "%s | e-com"
    },
    description: 'Generated by NextJS14',
};

export default function OrderLayout({children} : {children: React.ReactNode}) {
    return (
        <>
            {children}
        </>
    )
}
