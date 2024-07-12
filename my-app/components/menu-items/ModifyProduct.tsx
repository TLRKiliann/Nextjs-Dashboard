import { ProductsProps } from '@/lib/definitions';
import Image from 'next/image';
import BtnModify from './btn-modify';
import BtnRemove from './btn-remove';
import FormChangeProduct from './form-change-product';

/*
    Admin can modify, update & remove products.
    It's not necessary to use Zustand here, 
    that's for modifying db & not the state, 
    such as context with cart.
*/

export default async function ProductsToModify({listProducts}: {listProducts: ProductsProps[]}) {
    return (
        <div className='relative mt-0 h-[50%] z-10'>
            
            <div className='absolute -z-10 w-full h-full overflow-y-scroll no-scrollbar pb-2'>

                {listProducts.map((product: ProductsProps) => (
                    <div key={product.id} 
                        className='flex flex-row items-center justify-between w-full h-[80px] bg-white 
                            rounded-lg shadow-sm-out p-4 m-2'>

                        <div className='w-[60px] h-[60px]'>
                            <Image 
                                src={product.img} 
                                width={100}
                                height={100}
                                className='w-[60px] h-[60px] object-fit rounded-lg shadow-sm-out'
                                alt="no img" 
                            />
                        </div>

                        {product.switcher === false ? (
                            <div className='w-full flex flex-row items-center justify-between'>

                                <div className='w-[15%] flex flex-row items-center font-bold ml-4 '>
                                    <h3>{product.family}</h3>
                                </div>

                                <div className='w-[15%] '>
                                    <h4>&nbsp;{product.name}</h4>
                                </div>

                                <div className='w-[15%] '>
                                    <p className='mr-4'>Stock: {product.stock}</p>
                                </div>
                                

                                <div className='flex items-center justify-center w-[140px] h-[80px] bg-slate-100'>
                                    <p className='font-bold text-slate-500'>Price: {product.price}.-</p>
                                </div>

                                <BtnModify 
                                    id={product.id} 
                                    switcher={product.switcher} 
                                />

                            </div>
                        ) : (
                            <>
                                <FormChangeProduct
                                    id={product.id}
                                    family={product.family}
                                    name={product.name}
                                    stock={product.stock}
                                    price={product.price}
                                />
                            </>
                        )}

                        <div className='flex items-center justify-between'>
                            <BtnRemove id={product.id} />
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
};
