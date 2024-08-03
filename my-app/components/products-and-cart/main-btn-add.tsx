"use client";

import type { Cart, Product } from '@prisma/client';
import { addProductToDb } from "@/lib/actions";
import { useStore } from "@/stores/store";
import usePersistStore from '@/helpers/usePersistStore';
import toast from "react-hot-toast";

type CartTypes = {
    id: number;
    quantity: number;
};

type MainBtnTypes = { 
    id: number; 
    name: string;
    product: Product;
    storeQuantity: CartTypes[]
};

export default function MainBtnAdd({ id, name, storeQuantity, product }: MainBtnTypes) {

    // zustand
    const store = usePersistStore(useStore, (state) => state);

    if (!store) {
        return <h2>Loading...</h2>
    };

    const productInCart: CartTypes | undefined = storeQuantity.find((item: {id: number}) => item.id === id);
    const searchQuantity = productInCart ? productInCart.quantity : 0;

    return (
        <div key={id} className='flex items-center justify-center mt-4'>
            <button 
                type="button"
                onClick={async () => {
                    const res = await addProductToDb({id});
                    store.addProducts(product);
                    if (res?.validationErrors) {
                        toast.error("Add product failed!");
                        return;
                    };
                    if (res?.serverError) {
                        toast.error("Add product failed!");
                        return;
                    };
                    toast.success("Successfully add to cart!");
                }} 
                className='w-[120px] h-[38px] text-sm font-bold text-slate-50 transform transition ease-in-out duration-200 
                    bg-blue-600 hover:bg-blue-700 hover:scale-105 active:bg-blue-800 rounded active:scale-95
                    disabled:opacity-50 m-auto shadow-sm-out'
                aria-label={`Add one more ${name}`}
                disabled={searchQuantity > 0}
            >
                {searchQuantity === 1 ? "Go to Cart ⬆" : "Add to Cart"}
            </button>
        </div>
    )
};
