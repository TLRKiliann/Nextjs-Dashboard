import prisma from '@/prisma/prisma';
import type { Product } from '@prisma/client';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AddItemToCart from '@/components/products-and-cart/action-cart-item/add-item-to-cart';
import DeleteItemFromCart from '@/components/products-and-cart/action-cart-item/delete-item-from-cart';
import RemoveItemsFromCart from '@/components/products-and-cart/action-cart-item/remove-items-from-cart';

type TypeProduct = {
    quantity: number;
};

type UserType = {
    products: TypeProduct[];
};

export default async function ShoppingCartPage({products}: {products: Product[]}) {

    const session = await auth();
    const user = session?.user;

    if (!user?.id) {
        return redirect("/api/auth/signin");
    };

    const storeQuantity: UserType | null = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        include: {
            products: {
                select: {
                    quantity: true,
                } 
            }
        }
    });

    if (!storeQuantity) {
        throw new Error("storeQuantity not set!");
    };

    const totalQuantity = storeQuantity.products.reduce((acc, product) => acc + product.quantity, 0);

    return (
        <div className='w-full min-h-screen flex flex-col text-slate-500 bg-slate-100 p-4 pt-[11vh]'>
        
            {totalQuantity > 0 ? (
                products.map((product: Product) => product.quantity > 0 ? (
                    <div key={product.id} className="w-full h-20 flex items-center justify-start space-x-4 bg-white rounded-md shadow-sm-out my-1 p-2">
                        
                        <div className='w-[70px] flex items-center justify-center border-none rounded-tl-md 
                            rounded-br-md'>
                            <Image src={product.img}
                                width={70}
                                height={70}
                                className="w-full h-auto object-cover rounded-tl-md rounded-br-md" 
                                alt="no img" 
                            />
                        </div>

                        <div className='flex flex-row items-center justify-around w-full h-full px-4'>
                            
                            <h3 className='sm:text-base lg:text-xl font-bold sm:-ml-10 xl:-ml-16'>
                                {product.family}
                            </h3>

                            <h4 className='text-center sm:text-base lg:text-lg'>
                                {product.name}
                            </h4>
                            
                            <h6 className='text-xs'>
                                Version: {product.version}
                            </h6>
                            
                            {product.stock === 0 ? (
                                <p className='text-sm text-red-500'>
                                    Stock: <span className='font-bold'>{product.stock}</span>
                                </p>
                            ) : (
                                <p className='text-sm text-blue-500'>
                                    Stock: <span className='font-bold'>{product.stock}</span>
                                </p>
                            )}

                            <p className='sm:text-sm lg:text-base font-bold'>
                                {product.price}.-
                            </p>

                            <li className='list-none text-xs text-center text-blue-500 hover:text-blue-600 
                                active:text-blue-700'>
                                <Link href={`/products/${product.name}`}>View more</Link>
                            </li>


                            <p className='text-sm text-center text-blue-500'>
                                Quantity: <span className='font-bold'>{product.quantity}</span>
                            </p>
                        </div>

                        <div className='flex flex-row items-center justify-between w-[200px]'>
                            
                            <div className='flex flex-row items-center justify-evenly w-[100px]'>
                                
                                <DeleteItemFromCart
                                    id={product.id}
                                    quantity={product.quantity}
                                    name={product.name}
                                    stock={product.stock}
                                />
                                
                                <AddItemToCart 
                                    id={product.id}
                                    name={product.name}
                                    stock={product.stock}
                                />

                            </div>

                                <RemoveItemsFromCart 
                                    id={product.id}
                                    name={product.name}
                                />

                        </div>

                        <div className='absolute z-50 h-20 right-0 bottom-0 -left-4 flex items-center justify-center bg-white -ml-4'>
                
                            <li className="list-none">
                                <Link href="/order/address" className='text-base font-bold text-slate-50 bg-blue-500 
                                    hover:bg-blue-600 active:bg-blue-700 px-6 py-2 rounded'>
                                    Payment
                                </Link>
                            </li>

                        </div>

                    </div>
                ): null
            )) : (
                <div 
                    className='absolute top-10 right-0 bottom-0 left-0 flex items-center justify-center 
                        bg-gradient-to-bl from-sky-100 from-10% to-slate-100 to-90%'
                >
                    <div className='rounded-md'>
                        <h3 className='text-xl text-center text-slate-700 px-2 pt-2'>
                            Cart is empty !
                        </h3>
                        <li className='list-none text-sm text-center text-blue-500 hover:text-blue-600 
                            active:text-blue-700 p-2'>
                            <Link href="/products">Go back to products</Link>
                        </li>
                    </div>
                </div>
            )}
        </div>
    )
}
