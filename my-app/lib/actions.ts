"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
//import { auth } from "@/auth";

//update card
export const addProductToDb = async (formData: FormData) => {
    try {
        await prisma.product.update({
            data: {
                id: Number(formData.get("id")),
                quantity: {
                    increment: 1,
                },
            },
            where: {
                id: Number(formData.get("id")),
            },
            select: {
                id: true,
                name: true
            }
        });
    } catch (error) {
        console.log("Error: ", error)
        return "Error: prisma.product.create";
    }
    revalidatePath("/products");
};

// increment quantity in cartItems
export async function addToCart(formData: FormData) {
    try {
        await prisma.product.update({
            data: {
                id: Number(formData.get("id")),
                quantity: {
                    increment: 1,
                },
            },
            where: {
                id: Number(formData.get("id")),
            },
        });
    } catch (error) {
        console.log("Error: ", error)
        return "Error: addToCart fn()";
    }
    revalidatePath("/products/cart");
};

// decrement quantity in cartItems
export async function deleteFromCart(formData: FormData) {
    try {
        await prisma.product.update({
            data: {
                id: Number(formData.get("id")),
                quantity: {
                    increment: -1,
                },
            },
            where: {
                id: Number(formData.get("id")),
            },
        });
    } catch (error) {
        console.log("Error: ", error)
        return "Error: deleteFromCart fn()";
    }
    revalidatePath("/products/cart");
};

// reinitialize quantity to 0 in cartItems
export async function removeFromCart(id: number) {
    try {
        await prisma.product.update({
            data: {
                id: id,
                quantity: 0,
            },
            where: {
                id: id,
            },
        });
    } catch (error) {
        console.log("Error: ", error)
        return "Error: removeFromCart fn()";
    }
    revalidatePath("/products/cart");
};

// /dashboard/products-admin
export async function handleModify(id: number, switcher: boolean) {
    try {
        await prisma.product.update({
            data: {
                id: id,
                switcher: !switcher,
            },
            where: {
                id: id,
            }
        })
    } catch (error) {
        console.log("Error: ", error)
        return "Error: handleModify fn()";
    }
    revalidatePath("/dashboard/products-admin");
};

// /dashboard/products-admin
export async function handleSaveProduct(
    id: number, family: string, name: string, stock: number, price: number
) {
    try {
        await prisma.product.update({
            data: {
                id: id,
                family: family,
                name: name,
                stock: stock,
                price: price,
                switcher: false,
            },
            where: {
                id: id,
            }
        })
    } catch (error) {
        console.log("Error: ", error)
        return "Error: handleSavePrice fn()";
    }
    revalidatePath("/dashboard/products-admin");
};

// /dashboard/products-admin
export async function handleRemove(id: number) {
    try {
        await prisma.product.findUnique({
            where: {
                id: id,
            }
        })
    } catch (error) {
        console.log("Error: ", error)
        return "Error: handleRemove fn()";
    }
    revalidatePath("/dashboard/products-admin");
};

/* export async function getAvailableProducts()  {
    try {
        await prisma.product.findMany();
    } catch (error) {
        console.log("Error: ", error)
        return "Error: getAvailableProducts fn()";
    }
    revalidatePath("/products/cart");
}
 */