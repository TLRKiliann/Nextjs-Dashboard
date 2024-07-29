"use client";

import type { Product } from '@prisma/client';
import StoreOfProducts from '@/components/products-and-cart/store-of-products';
import Loader from '@/components/Loader';
import usePersistStore from '@/helpers/usePersistStore';
import { useStore } from '@/stores/store';

export default function AllProducts({ products }: {products: Product[]}): JSX.Element {
    
    // zustand
    const store = usePersistStore(useStore, (state) => state);
    
    if (!store || !products) {
        return <Loader />
    };

    if (products && store) {
        store.bearProducts = products;
    };

    return (
        <div className='min-h-screen grid grid-cols-3 xl:grid-cols-4 grid-rows-3 bg-slate-100 gap-4 p-4 pt-[12vh]'>
            {store.bearProducts.map((product: Product) => (
                <StoreOfProducts
                    key={product.id}
                    product={product}
                /> 
            ))}
        </div>
    )
};
