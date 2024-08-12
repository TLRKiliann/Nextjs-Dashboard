"use server";

import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { actionClient, authActionClient, ActionError } from "../safe-action";
import { z } from "zod";
import { zfd } from "zod-form-data";

// email from /contact
const schemaEmail = zfd.formData({
    src: zfd.text(z.string()),
    message: zfd.text(z.string())
});

export const messageSender = actionClient
    .schema(schemaEmail)
    .action(
        async ({ parsedInput }) => {
        try {
            await prisma.message.create({
                data: {
                    src: parsedInput.src,
                    message: parsedInput.message,
                }
            })
        } catch (error) {
            throw new ActionError("Error with message!");
        }
    revalidatePath("/contact");
    console.log("Message sent!");
});
