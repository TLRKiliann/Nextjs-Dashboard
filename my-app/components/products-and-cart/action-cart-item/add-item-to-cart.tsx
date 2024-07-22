"use client";

//import { useAction } from "next-safe-action/hooks"
//import toast from 'react-hot-toast';
import { addToCart } from '@/lib/actions';

//export default function AddItemToCart({id, name, handleAddProduct}: 
export default function AddItemToCart({id, name}: 
    {
        id: number;
        name: string;
        //handleAddProduct: (id: number) => void;
    }) {

    //const { execute, result, isExecuting } = useAction(addToCart)

    /* const onSubmit = async (id: number) => {
        const res = await addToCart({id: props.id});
        if (res.message === "Success!") {
            toast.success("Successfully deleted from cart!");
        } else if (res.message === "There is an error!") {
            toast.error("Deleted from cart failed!");
        } else {
            toast.error("An unexpected error occurred.");
        }
    }; */

    return (
        <div key={id}>
            {/* <input type="number" id="id" name="id" value={id} hidden readOnly /> */}
            <button type="button" onClick={async () => {
                await addToCart({id: id});
                //handleAddProduct(id);
                console.log("ok, request done")

                /* console.log(values, "values");
                if (values.validationError) {
                    toast.error("error")
                    return;
                }
                if (values.serverError) {
                    toast.error("error")
                    return;
                } */
            }}
                className="w-[38px] h-[38px] text-slate-100 font-bold bg-blue-500 
                    hover:bg-blue-600/90 active:bg-blue-600
                    rounded-full shadow-sm-out"
                aria-label={`Add one ${name}`}
            >
                +
            </button>
        </div>
    )
}

