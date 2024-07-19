import { readFile, writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const browser = body;
    const filename = './utils/browseros-data.json';
    try {
        const nextBrowser = {browser};
        const file = await readFile(filename, { encoding: 'utf8' });
        const prevBrowsers = JSON.parse(file);
        prevBrowsers.push(nextBrowser);
        await writeFile(filename, JSON.stringify(prevBrowsers, null, 4));
        console.log('Data has been written to browseros-data.json');
    } catch (error) {
        throw new Error('An error occurred while writing to browseros-data.json:');
    };
    return NextResponse.json({message: "browser & os detected"});
}