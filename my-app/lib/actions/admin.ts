"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { actionClient, ActionError } from "../safe-action";
import { z } from "zod";
import { zfd } from "zod-form-data";

// Resusable zod schema
const schemaId = z.object({
    id: z.number(),
});

// /dashboard/products-admin (ProductToModify)
export const handleModify = actionClient
    .schema(
        z.object({
            id: z.number(),
            switcher: z.boolean()
        }
    ))
    .action(async ({ parsedInput }) => {
    try {
        await prisma.product.update({
            data: {
                id: parsedInput.id,
                switcher: !parsedInput.switcher,
            },
            where: {
                id: parsedInput.id,
            }
        })
    } catch (error) {
        console.log("Error: ", error)
        throw new ActionError("Error: handleModify fn()");
    }
    revalidatePath("/dashboard/products-admin");
});

const schemaSaveProd = zfd.formData({
    id: zfd.numeric(z.number()), 
    family: zfd.text(z.string()),
    name: zfd.text(z.string()),
    stock: zfd.numeric(z.number()),
    price: zfd.numeric(z.number())
});

// /dashboard/products-admin (ProductToModify)
export const handleSaveProduct = actionClient
    .schema(schemaSaveProd)
    .action(async ({ parsedInput }) => {
        try {
            const productModified = await prisma.product.update({
                data: {
                    id: parsedInput.id,
                    family: parsedInput.family,
                    name: parsedInput.name,
                    stock: parsedInput.stock,
                    price: parsedInput.price,
                    switcher: false,
                },
                where: {
                    id: parsedInput.id,
                }
            });

            if (!productModified) {
                throw new ActionError("Error: handleSaveProduct fn(1)");
            };
            await prisma.cart.update({
                data: {
                    id: parsedInput.id,
                    family: parsedInput.family,
                    name: parsedInput.name,
                    stock: parsedInput.stock,
                    price: parsedInput.price,
                    switcher: false,
                },
                where: {
                    id: parsedInput.id,
                }
            });
        } catch (error) {
            console.log("Error: ", error)
            throw new ActionError("Error: handleSaveProduct fn(2)");
        }
    revalidatePath("/dashboard/products-admin");
});

// /dashboard/products-admin (ProductToModify)
export const handleRemove = actionClient
    .schema(schemaId)
    .action(async ({ parsedInput }) => {
        try {
            const productRm = await prisma.cart.delete({
                where: {
                    id: parsedInput.id,
                }
            })

            if (!productRm) {
                throw new ActionError("Error: handleRemove fn(1)");
            };

            await prisma.product.delete({
                where: {
                    id: productRm.id,
                }
            });
        } catch (error) {
            console.log("Error: ", error)
            throw new ActionError("Error: handleRemove fn(2)");
        }
    revalidatePath("/dashboard/products-admin");
});

// /dashboard/products-admin (CreateProduct)
const schemaProduct = zfd.formData({
    id: zfd.numeric(z.number()),
    family: zfd.text(z.string()),
    name: zfd.text(z.string()),
    version: zfd.text(z.string()),
    stock: zfd.numeric(z.number()),
    price: zfd.numeric(z.number())
});

export const createProduct = actionClient
    .schema(schemaProduct)
    .action(async({ parsedInput }) => {
        try {
            const newProduct = await prisma.product.create({
                data: {
                    id: parsedInput.id,
                    family: parsedInput.family,
                    name: parsedInput.name,
                    img: "/assets/images/cpu/cpu_i3.jpg",
                    version: parsedInput.version,
                    quantity: 0,
                    stock: parsedInput.stock,
                    price: parsedInput.price,
                } 
            });

            if (!newProduct) {
                throw new ActionError("Error during creation of product!");
            };
            
            await prisma.cart.create({
                data: {
                    id: newProduct.id,
                    family: parsedInput.family,
                    name: parsedInput.name,
                    img: "/assets/images/cpu/cpu_i3.jpg",
                    version: parsedInput.version,
                    quantity: 0,
                    stock: parsedInput.stock,
                    price: parsedInput.price,
                    productId: newProduct.id
                }
            })
        } catch (error) {
            throw new ActionError("Error during creation of product!");
        }
    revalidatePath("/dashboard/products-admin");
    console.log("Product created!");
});

// EMAIL actions
export const openEmail = actionClient
    .schema(z.object({id: z.string()}))
    .action(async({ parsedInput }) => {
        try {
            await prisma.message.update({
                data: {
                    id: parsedInput.id,
                    isOpen: true,
                },
                where: {
                    id: parsedInput.id,
                }   
            })
        } catch (error) {
            throw new ActionError("Open message failed!");
        }
    revalidatePath("/dashboard/emails-admin");
    console.log("Open message done!");
});

export const closeEmail = actionClient
    .schema(z.object({id: z.string()}))
    .action(async ({ parsedInput }) => {
        try {
            await prisma.message.update({
                data: {
                    id: parsedInput.id,
                    isOpen: false,
                },
                where: {
                    id: parsedInput.id,
                }   
            })
        } catch (error) {
            throw new ActionError("Close message failed!");
        }
    revalidatePath("/dashboard/emails-admin");
    console.log("Close message done!");
});

export const removeEmail = actionClient
    .schema(z.object({id: z.string()}))
    .action(async ({ parsedInput }) => {
        try {
            await prisma.message.delete({
                where: {
                    id: parsedInput.id,
                }
            })
        } catch (error) {
            throw new ActionError("removeEmail failed!");
        }
    revalidatePath("/dashboard/emails-admin");
    console.log("removeEmail done!");
});

// deleteMany()

// admin response
const schemaAdminEmail = zfd.formData({
    src: zfd.text(z.string()),
    textMail: zfd.text(z.string()),
    dst: zfd.text(z.string())
});

export const adminEmail = actionClient
    .schema(schemaAdminEmail)
    .action(async ({ parsedInput }) => {
        try {
            await prisma.message.create({
                data: {
                    src: parsedInput.src,
                    message: parsedInput.textMail,
                    dst: parsedInput.dst,
                    isOpen: true,
                }
            })
        } catch (error) {
            throw new ActionError("Error message!");
        }
    revalidatePath("/dashboard/emails-admin");
    console.log("Message sent");
});

