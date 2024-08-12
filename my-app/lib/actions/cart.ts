"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { authActionClient, ActionError } from "../safe-action";
import { z } from "zod";

// Resusable zod schema
const schemaId = z.object({
    id: z.number(),
});

// increment quantity in cartItems
export const addToCart = authActionClient
    .schema(schemaId)
    .action(async ({ parsedInput, ctx: { userId }}) => {

        const user = await prisma.user.findUnique({
            where: { 
                id: String(userId)
            },
        });
        
        if (!user) {
            throw new ActionError("User not found!");
        };

        try {
            await prisma.cart.update({
                data: {
                    quantity: {
                        increment: 1,
                    },
                    stock: {
                        increment: -1,
                    },
                    user: {
                        connect: {
                            id: String(userId),
                        }
                    }
                },
                where: {
                    id: parsedInput.id,
                },
            });
        } catch (error) {
            throw new ActionError("Error to add product to cart");
        }
    revalidatePath("/cart");
    console.log("Add product to cart done!");
});


// decrement quantity in cartItems
export const deleteFromCart = authActionClient
    .schema(schemaId)
    .action(async ({ parsedInput, ctx: { userId }}) => {

        const user = await prisma.user.findUnique({
            where: { 
                id: String(userId)
            },
        });
        
        if (!user) {
            throw new ActionError("User not found!");
        };

        try {
            await prisma.cart.update({
                data: {
                    quantity: {
                        increment: -1,
                    },
                    stock: {
                        increment: 1,
                    },
                    user: {
                        connect: {
                            id: String(userId),
                        }
                    }
                },
                where: {
                    id: parsedInput.id,
                },
            });
        } catch (error) {
            console.log("Error: ", error)
            throw new ActionError("Error to delete product!");
        }
    revalidatePath("/cart");
    console.log("Delete from cart done!")
});

// reinitialize quantity to 0 in cartItems
export const removeFromCart = authActionClient
    .schema(schemaId)
    .action(async ({ parsedInput, ctx: { userId }}) => {

        const user = await prisma.user.findUnique({
            where: { 
                id: String(userId)
            },
        });
        
        if (!user) {
            throw new ActionError("User not found!");
        };

        let resetStock: number = 0;
        switch (parsedInput.id) {
            case 1:
                resetStock = 19;
                break;
            case 2:
                resetStock = 28;
                break;
            case 3:
                resetStock = 23;
                break;
            case 4:
                resetStock = 34;
                break;
            case 5:
                resetStock = 21;
                break;
            case 6:
                resetStock = 19;
                break;
            case 7:
                resetStock = 17;
                break;
        }
        try {
            await prisma.cart.update({
                data: {
                    quantity: 0,
                    stock: resetStock,
                    user: {
                        connect: {
                            id: String(userId),
                        }
                    },
                },
                where: {
                    id: parsedInput.id,
                },
            });
        } catch (error) {
            throw new ActionError("Remove product failed");
        }
    revalidatePath("/cart");
    console.log("Remove product done!");
});