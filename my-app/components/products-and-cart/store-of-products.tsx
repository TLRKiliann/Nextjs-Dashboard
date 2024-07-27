import type { Product } from '@prisma/client';
//import { addProductToDb } from '@/lib/actions';
import Link from 'next/link';
import Image from 'next/image';
import MainBtnAdd from './main-btn-add';

type ProductProps = {
    product: Product;
};

export default function StoreOfProducts({ product }: ProductProps) {
    return (
        <div key={product.id} className="w-full h-full text-slate-100/90 bg-gradient-to-tr from-slate-700 to-slate-950 rounded-md shadow-card">
            
            <div className='w-full h-full flex flex-col items-center justify-between rounded-md'>

                <div className="w-full h-auto flex flex-row items-start justify-between rounded-tl-tr-md">
                    <div className='w-[200px] h-auto rounded-tl-md rounded-br-md'>
                        <Image src={product.img}
                            width={100}
                            height={100}
                            className="object-cover rounded-tl-md rounded-br-md shadow-white" 
                            alt="no img" 
                        />
                    </div>

                    <div className='flex flex-col items-start justify-between w-full h-full pt-2 pl-[2%]'>
                        <h3 className='text-xl'>{product.family}</h3>
                        <h4 className='text-lg'>{product.name}</h4>
                        <h4 className='text-xs my-2'>Version: {product.version}</h4>
                        <p className='text-base font-bold'>{product.price}.-</p>
                    </div>
                </div>

                <div className='w-full'>
                    <div className='flex items-center justify-center'>
                        <MainBtnAdd
                            id={product.id}
                            name={product.name}
                            quantity={product.quantity}
                            product={product}
                        />
                    </div>
                </div>

                <div className='text-center my-4'>
                    <li className='list-none text-blue-400/80 hover:text-blue-600 active:text-blue-700'>
                        <Link href={`/products/${product.name}`}>
                            View product
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    )
}