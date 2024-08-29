import { User } from 'next-auth';
import type { Product } from '@prisma/client';
import StoreOfProducts from '@/components/products/store-of-products';
import CartProduct from '@/components/products/CartProduct';

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

    return (
        <div className='w-full min-h-screen bg-slate-50'>

            <div className='w-full h-full grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-rows-3 gap-10 p-10 pt-[14vh]'>
                {products.map((product: Product) => (
                    <StoreOfProducts
                        key={product.id}
                        product={product}
                        user={user}
                    /> 
                ))}
            </div>

            <div className='fixed z-20 top-0 left-0 w-[500px] h-auto'>
                <CartProduct userCart={userCart} user={user} />
            </div>

        </div>
    )
};
