import { createProduct } from '@/lib/actions';
import FormCreateContent from './form-create-content';

/*
    Admin can create new product for db.
    that's for modifying db & not the state, 
    such as context with cart.
*/

export default function CreateProduct() {
    return (
        <div className='flex flex-col items-center justify-center w-full h-[50%] bg-slate-200 rounded'>
            <div className='h-full flex flex-col items-center justify-center mx-4'>
                <form 
                    action={createProduct} 
                    className='flex flex-col items-center justify-center w-[460px] h-full rounded-lg'
                >
                    <FormCreateContent />
                </form>
            </div>
        </div>
    )
}
