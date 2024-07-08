"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
//import { auth } from "@/auth";

//update
export const addProductToDb = async (formData: FormData) => {
    try {
        await prisma.post.update({
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
        revalidatePath("/testcart");
    } catch (error) {
        console.log("Error: ", error)
        throw new Error("Error: prisma.post.create");
    }
};


export const deleteProductToDb = async (formData: FormData) => {
    try {
        await prisma.post.update({
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
        revalidatePath("/testcart");
    } catch (error) {
        console.log("Error: ", error)
        throw new Error("Error: prisma.post.create");
    }
};