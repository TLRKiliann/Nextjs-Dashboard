"use client";

import { ProductsProps } from '@/lib/definitions';
import { useStore } from '@/lib/store';
import usePersistStore from '@/helpers/usePersistStore';

import Loader from '@/components/Loader';

export default function MainBtnAdd({ product, id, name, quantity }: {
    product: ProductsProps, 
    id: number, 
    name: string, 
    quantity: number }) {

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <Loader />;
    };

    // add product from prisma to zustand
    const handleAddProduct = () => {
        store.addProducts(product);
    };

    return (
        <div className='flex items-center justify-center mt-4'>
            <input type="number" name="id" value={id} readOnly hidden />
            <button type="submit" onClick={handleAddProduct}
                className='w-[120px] h-[38px] text-sm font-bold bg-blue-500 hover:bg-blue-600 
                    active:bg-blue-700 rounded disabled:opacity-50 m-auto'
                aria-label={`Add one more ${name}`}
                disabled={quantity > 0 ? true : false}
            >
                Add to Cart
            </button>
        </div>
    )
}
