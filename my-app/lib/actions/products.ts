"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { authActionClient, ActionError } from "../safe-action";
import { z } from "zod";

// Resusable zod schema
const schemaId = z.object({
    id: z.number(),
});

//add product
export const addProductToDb = authActionClient
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
                    },
                },
                where: {
                    id: parsedInput.id,
                }
            });
        } catch (error) {
            console.log("Error: ", error)
            throw new ActionError("Error to add product (main)!");
        }
    revalidatePath("/products");
});