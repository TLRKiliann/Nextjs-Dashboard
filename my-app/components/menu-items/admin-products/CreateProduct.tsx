import type { Product } from "@prisma/client";
import prisma from "@/prisma/prisma";
import FormCreateContent from "./create-modify-form-content/form-create-content";

/*
    Admin can create new product for db.
    that's for modifying db & not the state, 
    such as context with cart.
*/

export default async function CreateProduct() {

    const nbOfProducts: Product[] = await prisma.product.findMany({
        orderBy: {
            id: "asc"
        }
    });

    if (nbOfProducts.length === 0) {
        return <div><h3>No products in db!</h3></div>
    };

    const idOfProduct: number = nbOfProducts.length + 1;

    return (
        /* <div className='relative z-50 flex flex-col items-center justify-center w-full h-[50%] bg-gradient-to-bl from-slate-900 to-cyan-900'>
            <div className='h-full flex flex-col items-center justify-center'>
                <div className='flex flex-col items-center justify-center w-[460px] h-full'> */
                    <FormCreateContent idOfProduct={idOfProduct} />
                /* </div>
            </div>
        </div> */
    )
}
