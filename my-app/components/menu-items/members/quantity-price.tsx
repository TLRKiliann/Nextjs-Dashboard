import prisma from "@/prisma/prisma";

type ProductType = {
    quantity: number;
    price: number;
};

type UserType = {
    products: ProductType[];
};

export default async function QuantityPrice({id, styles}: {id: string; styles: string;}) {

    const userProducts: UserType | null = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            products: {
                where: {
                    authorId: id,
                },
                select: {
                    quantity: true,
                    price: true,
                }
            }
        }
    });

    if (!userProducts) {
        throw new Error("Error: unique user fetch failed!");
    };

    const prodQuantity = userProducts.products.reduce((acc: number, 
        prod: { quantity: number; }) => acc + prod.quantity, 0);
    const prodPrice = userProducts.products.reduce((acc: number, 
        product: { price: number; quantity: number; }) => acc + (product.price * product.quantity), 0);

    return (
        <div key={id} className="w-[80%] m-auto mt-4 mb-2">

            <div className={`flex flex-row items-center justify-between ${styles} mb-2 p-2 rounded`}>
                <p className="text-base font-bold">Quantity:&nbsp;</p>
                <p className="text-base">{prodQuantity} pc</p>
            </div>

            <div className={`flex flex-row items-center justify-between ${styles} p-2 rounded`}>
                <p className="text-base font-bold">Total:&nbsp;</p>
                <p className="text-base">{prodPrice}.-</p>
            </div>

      </div>
    )
}
