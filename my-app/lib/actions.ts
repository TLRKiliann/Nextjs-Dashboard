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