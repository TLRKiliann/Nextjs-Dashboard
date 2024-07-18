import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { readdir, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import path from 'path';

export const GET = async (request: Request): Promise<NextResponse> => {
    const files = await readdir("./public/assets/images/upload");
    return NextResponse.json({msg: "image get successfully", files});
}

export const POST = async (request: Request): Promise<NextResponse> => {
    const file = await request.formData();

    const image = file.get("image");
    
    if (image instanceof Blob) {
        const byteLength = await image.arrayBuffer();
        const bufferData = Buffer.from(byteLength);

        const pathOfImage = `./public/assets/images/upload/${new Date().getTime()}${path.extname(image.name)}`;
        await writeFile(pathOfImage, bufferData);

        const session = await auth();
        const user = session?.user;
        if (!user) {
            throw new Error("An error occured during definition of auth");
        };

        const pathToDb = pathOfImage.slice(8);
        await prisma.user.update({
            data: {
                email: user.email!,
                image: pathToDb,
            },
            where: {
                email: user.email!,
            }
        })
        revalidatePath("/profile");
    };
    return NextResponse.json({msg: "image upload successfully"});
};