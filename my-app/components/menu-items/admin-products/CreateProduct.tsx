import FormCreateContent from "./create-modify-form-content/form-create-content";

/*
    Admin can create new product for db.
    that's for modifying db & not the state, 
    such as context with cart.
*/

export default function CreateProduct() {
    return (
        <div className='relative z-50 flex flex-col items-center justify-center w-full h-[50%] bg-slate-200 rounded'>
            <div className='h-full flex flex-col items-center justify-center mx-4'>
                <div className='flex flex-col items-center justify-center w-[460px] h-full rounded-lg'>
                    <FormCreateContent />
                </div>
            </div>
        </div>
    )
}
