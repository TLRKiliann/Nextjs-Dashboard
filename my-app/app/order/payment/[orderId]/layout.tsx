import { Metadata } from 'next';

export const generateMetadata = async ({params}: {params: {orderId: string}}): Promise<Metadata> => {
    const title = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(`method ${params.orderId}`)
        }, 300)
    })
    return {
        title: `Order ${title}`
    }
}

export default function OrderIdLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}
