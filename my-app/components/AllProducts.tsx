"use client";

import type { Product } from '@prisma/client';
import usePersistStore from '@/helpers/usePersistStore';
import { useStore } from '@/stores/store';
import { useEffect } from 'react';
import StoreOfProducts from '@/components/products-and-cart/store-of-products';
import Loader from '@/components/Loader';

export default function AllProducts({ products }: { products: Product[] }): JSX.Element {

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    useEffect(() => {
        if (store && products) {
            const currentProducts = store.bearProducts;
            if ((JSON.stringify(currentProducts) !== JSON.stringify(products))) {
                console.log("Setting products in store:", products);
                store.setProducts(products);
            }
        }
        return () => console.log("clean-up!");
    }, [products, store]);

    if (!store || !products) {
        return <Loader />
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
