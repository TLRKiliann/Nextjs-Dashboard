import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProductNameCard from '@/components/products-and-cart/ProductNameCard';
import Loader from '@/components/Loader';

export default async function ProductIdPage({params}: {params: {productName: string}}) {

    if (!params.productName) {
        notFound();
    };

    return (
        <Suspense fallback={<Loader />}>
            <ProductNameCard params={params} />
        </Suspense>
    )
};