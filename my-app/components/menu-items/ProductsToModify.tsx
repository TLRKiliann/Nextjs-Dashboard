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

export default function ProductsToModify({listProducts}: {listProducts: ProductsProps[]}) {
    return (
        <div className='relative mt-0 h-[60%] z-10'>
            
            <div className='absolute -z-10 flex flex-col items-center justify-center w-full h-[100%]
                overflow-y-scroll no-scrollbar pt-10 md:pt-40 xl:pt-20 2xl:-mt-20'>

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

                        <div className='w-full flex flex-row items-center justify-evenly'>

                            {product.switcher === false ? (
                                <>
                                    <div className='w-[15%] flex flex-row items-center justify-start font-bold ml-4'>
                                        <h3>{product.family}</h3>
                                    </div>

                                    <div className='w-[15%] flex flex-row items-center justify-start font-bold ml-4'>
                                        <h4>&nbsp;{product.name}</h4>
                                    </div>


                                    <div className='w-[20%] flex flex-row items-center justify-center'>
                                        <p className='mr-4'>Stock: {product.stock}</p>
                                    </div>

                                    <div className='w-[20%] flex flex-row items-center justify-start'>
                                        <p className='font-bold'>Price: {product.price}.-</p>
                                    </div>

                                    <div className='flex items-center justify-end w-[10%]'>
                                        <BtnModify 
                                            id={product.id} 
                                            switcher={product.switcher} 
                                        />
                                    </div>
                                </>
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
                    </div>
                ))}
            </div>
        </div>
    )
};
