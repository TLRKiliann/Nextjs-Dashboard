import { recordMethod } from '@/lib/actions/payment';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function MethodBtn({pathMethod}: {pathMethod: string}) {

    const router = useRouter();

    return (
        <div className='w-full h-[20%] flex flex-row items-center justify-around mt-8 pb-2'>
            <button
                type="button"
                onClick={() => router.back()}
                className='text-base text-slate-50 font-bold bg-blue-500 
                    hover:bg-blue-600 active:bg-blue-700
                    px-6 py-[5px] rounded shadow-lg'>
                Back
            </button>
            <button 
                type="button"
                onClick={async () => {
                    const response = await recordMethod({pathMethod});

                    if (response?.validationErrors) {
                        toast.error("Payment method failed!");
                    };
                    if (response?.serverError) {
                        toast.error("Error with payment method");
                    };
                    toast.success("Payment method done!");
                }}
                className={`${!pathMethod ? "opacity-50" : "opacity-100"} text-base text-slate-50 
                    font-bold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-6 py-[5px] 
                    rounded shadow-lg`}
                disabled={!pathMethod ? true : false}    
            >
                Next
            </button>
        </div>
    )
}
