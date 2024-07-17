import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const browser = body;
    try {
        await writeFile('./utils/browseros-data.json', JSON.stringify({browser}));
        console.log('Data has been written to browseros-data.json');
    } catch (err) {
        throw new Error('An error occurred while writing to browseros-data.json:');
    };
    return NextResponse.json({message: "browser & os detected"});
}