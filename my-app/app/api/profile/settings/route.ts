import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { readdir, writeFile } from "fs/promises";
import path from 'path';

export async function GET() {
    try {
        const files = await readdir("./public/assets/images/upload");
        return NextResponse.json({msg: "image get successfully", files});
    } catch (error) {
        return NextResponse.json({ msg: `Error retrieving images: ${error}` }, { status: 500 });
    }
};

export async function POST(request: Request) {
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
            return Response.json({error: "Unauthorized"}, {status: 401});
        };

        const pathToDb = pathOfImage.slice(8);

        try {
            await prisma.user.update({
                data: {
                    id: user.id,
                    image: pathToDb,
                },
                where: {
                    id: user.id,
                }
            })
        } catch (error) {
            return NextResponse.json({msg: "Error: prisma update image!"});
        }
    };
    return NextResponse.json({msg: "image upload successfully"}, {status: 200});
};