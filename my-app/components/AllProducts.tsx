import { User } from 'next-auth';
import type { Product } from '@prisma/client';
import StoreOfProducts from '@/components/products-and-cart/store-of-products';
import Loader from '@/components/Loader';

export default function AllProducts({ products, user }: { products: Product[]; user: User }): JSX.Element {

    if (!products) {
        return <Loader />
    };

    return (
        <div className='min-h-screen grid grid-cols-3 xl:grid-cols-4 grid-rows-3 bg-slate-50 gap-4 p-4 pt-[12vh]'>
            {products.map((product: Product) => (
                <StoreOfProducts
                    key={product.id}
                    product={product}
                    user={user}
                /> 
            ))}
        </div>
    )
};
