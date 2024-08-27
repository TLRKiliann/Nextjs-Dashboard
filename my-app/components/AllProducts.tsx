import { User } from 'next-auth';
import type { Product } from '@prisma/client';
import StoreOfProducts from '@/components/products/store-of-products';
import CartProduct from '@/components/products/CartProduct';
import Loader from '@/components/Loader';

type ProductType = {
    family: string;
    name: string;
    quantity: number;
    price: number;
  };
  
type UserCartType = {
    id: string;
    carts: ProductType[];
};

export default function AllProducts({ products, user, userCart }: { products: Product[]; user: User; userCart: UserCartType }): JSX.Element {

    if (!products) {
        return <Loader />
    };

    return (
        <div className='relative w-full min-h-screen'>

            <div className='w-full min-h-screen grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-3 bg-slate-50 gap-10 p-10 pt-[14vh]'>
                {products.map((product: Product) => (
                    <StoreOfProducts
                        key={product.id}
                        product={product}
                        user={user}
                    /> 
                ))}
            </div>

            <div className='fixed z-20 top-[10vh] right-0 w-[500px] h-auto'>
                <CartProduct userCart={userCart} />
            </div>

        </div>
    )
};
