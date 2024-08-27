import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProductId from '@/components/products/ProductId';
import Loader from '@/components/Loader';

export default async function ProductIdPage({ params }: {params: { productId: string }}) {

    if (!params.productId) {
        notFound();
    };

    return (
        <Suspense fallback={<Loader />}>
            <ProductId params={params} />
        </Suspense>
    )
};