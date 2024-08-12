"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authActionClient, ActionError } from "../safe-action";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schemaSaveAddress = zfd.formData({
    address: zfd.text(z.string()),
    city: zfd.text(z.string()),
    npa: zfd.text(z.string()),
    country: zfd.text(z.string())
});

// address recoder
export const saveAddress = authActionClient
    .schema(schemaSaveAddress)
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
            await prisma.payment.create({
                data: {
                    usernameId: String(userId),
                    address: parsedInput.address,
                    city: parsedInput.city,
                    npa: parsedInput.npa,
                    country: parsedInput.country,
                }
            })
            
        } catch (error) {
            throw new ActionError("Error with address register!");
        }
    revalidatePath("/order/address");
    redirect("/order/payment-method");
});

//payment method
export const recordMethod = authActionClient 
    .schema(z.object({pathMethod: z.string()}))
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
            const lastPayment = await prisma.payment.findFirst({
                where: {
                    usernameId: String(userId),
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (!lastPayment) {
                return {
                    message: "No payment found for this user!"
                };
            }
            await prisma.payment.update({
                data: {
                    method: parsedInput.pathMethod,
                },
                where: {
                    id: lastPayment.id,
                }
            });
        } catch (error) {
            throw new ActionError("Error with payment method!");
        }
    revalidatePath("/order/payment-method");
    redirect("/payment");
});