import prisma from "@/prisma/prisma";

type ProductType = {
    quantity: number;
    price: number;
};

type UserType = {
    carts: ProductType[];
};

export default async function QuantityPrice({id, styles}: {id: string; styles: string;}) {

    const userProducts: UserType | null = await prisma.user.findUnique({
        where: {
            id: id,
        },
        include: {
            carts: {
                where: {
                    userId: id,
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

    const prodQuantity = userProducts.carts.reduce((acc: number, 
        prod: { quantity: number; }) => acc + prod.quantity, 0);
    const prodPrice = userProducts.carts.reduce((acc: number, 
        product: { price: number; quantity: number; }) => acc + (product.price * product.quantity), 0);

    return (
        <div key={id} className="w-[80%] text-xs xl:text-base m-auto mt-4 mb-2">

            <div className={`flex flex-row items-center justify-between ${styles} mb-2 p-2 rounded`}>
                <p className="font-bold">Quantity:&nbsp;</p>
                <p>{prodQuantity} pc</p>
            </div>

            <div className={`flex flex-row items-center justify-between ${styles} p-2 rounded`}>
                <p className="font-bold">Total:&nbsp;</p>
                <p>{prodPrice}.-</p>
            </div>

      </div>
    )
}
