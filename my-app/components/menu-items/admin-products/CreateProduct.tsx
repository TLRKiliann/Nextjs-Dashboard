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
        <FormCreateContent idOfProduct={idOfProduct} />
    )
};
