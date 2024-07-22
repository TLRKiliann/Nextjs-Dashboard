import { ApiPublicIp } from "@/utils/api-request";
import { readFile, writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    if (body === null) {
        return NextResponse.json({message: "browser failed"});
    };
    const browser = body;
    const filename = './utils/browseros-data.json';
    try {
        const nextBrowser = { browser };
    
        const file = await readFile(filename, { encoding: 'utf8' });
        const prevBrowsers = JSON.parse(file);
        prevBrowsers.push(nextBrowser);

        await writeFile(filename, JSON.stringify(prevBrowsers, null, 4));
        console.log('Data has been written to browseros-data.json');
    } catch (error) {
        throw new Error('An error occurred while writing to browseros-data.json:');
    };

    try {
        const ipResult = await ApiPublicIp();

        if (!ipResult) {
            throw new Error("No ip public detected");
        } else {
            console.log("Public IP detected");
        };
    
        const filename = './utils/ip-data.json';
        try {
            const file = await readFile(filename, { encoding: 'utf8' });
            const previousIp = JSON.parse(file);
            previousIp.push(ipResult);

            await writeFile(filename, JSON.stringify(previousIp, null, 4));
            console.log('Data has been written to ip-data.json');
        } catch (err) {
            throw new Error('An error occurred while writing to ip-data.json:');
        };

    } catch (error) {
        throw new Error('An error occurred while writing to browseros-data.json:'); 
    }
    return NextResponse.json({message: "browser & os detected"});
}