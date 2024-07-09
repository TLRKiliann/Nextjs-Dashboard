"use client";

import { ProductsProps } from '@/lib/definitions';
import { addProductToDb } from '@/lib/actions';
import { useStore } from '@/lib/store';
import usePersistStore from '@/helpers/usePersistStore';
import Link from 'next/link';
import Image from 'next/image';
import Loader from '@/components/Loader';

type ProductProps = {
    product: ProductsProps;
};

export default function Card({product}: ProductProps) {

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <Loader />;
    };

    const handleAddProduct = () => {
        store.addProducts(product);
    };

    return (
        <div key={product.id} className="w-full h-full text-slate-100/90 bg-gradient-to-tr from-slate-700 to-slate-950 rounded-md">
            
            <div className='w-full h-full flex flex-col items-center justify-between rounded-md'>

                <div className="w-full h-auto flex flex-row items-start justify-between rounded-tl-tr-md">
                    <div className='w-full rounded-tl-md rounded-br-md'>
                        <Image src={product.img}
                            width={100}
                            height={100}
                            className="w-[120px] h-auto object-fit rounded-tl-md rounded-br-md shadow-white" 
                            alt="no img" 
                        />
                    </div>

                    <div className='flex items-center justify-start w-full pt-2'>
                        <div className='flex flex-col items-start justify-start w-full'>
                            <h3 className='text-xl'>{product.family}</h3>
                            <h4 className='text-lg'>{product.name}</h4>
                            <h4 className='text-xs my-2'>Version: {product.version}</h4>
                            <p className='text-base font-bold'>{product.price}.-</p>
                        </div>
                    </div>
                </div>

                <div className='w-full'>

                    <form action={addProductToDb} className='flex items-center justify-center mt-4'>
                        <input type="number" name="id" value={product.id} readOnly hidden />
                        <button type="submit" onClick={handleAddProduct}
                            className='w-[120px] h-[38px] text-sm font-bold bg-blue-500 hover:bg-blue-600 
                                active:bg-blue-700 rounded disabled:opacity-50 m-auto'
                            aria-label={`Add one more ${product.name}`}
                        >
                            Add to Cart
                        </button>
                    </form>

                </div>

                <div className='text-center my-4'>
                    <li className='list-none text-blue-400/80 hover:text-blue-600 active:text-blue-700'>
                        <Link href={`/products/${product.id}`}>
                            View product
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    )
}
