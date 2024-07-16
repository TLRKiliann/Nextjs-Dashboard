import { readdir, writeFile } from "fs/promises";
import { StaticImageData } from "next/image";
import { NextResponse } from "next/server";
import path from 'path';

export const GET = async (request: Request): Promise<NextResponse | string> => {
    const files = await readdir("./public/assets/images/upload");
    return NextResponse.json({msg: "image get successfully", files});
}

export const POST = async (request: Request): Promise<NextResponse> => {
    const file = await request.formData();

    const image = file.get("image");

    const byteLength = await image?.arrayBuffer();

    const bufferData = await Buffer.from(byteLength);

    const pathOfImage = `./public/assets/images/upload/${new Date().getTime()}${path.extname(image?.name)}`;

    writeFile(pathOfImage, bufferData);

    console.log(pathOfImage);
    return NextResponse.json({msg: "image upload successfully"});
};