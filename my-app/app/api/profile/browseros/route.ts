import { NextResponse } from "next/server";
import { readData, writeData } from '@/utils/api-request';

export async function POST(request: Request) {
    const body: string = await request.json();
    if (!body) {
        return NextResponse.json({ message: "browser failed" });
    };
    const browser: string = body;
    const filename: string = './utils/browseros-data.json';
    try {
        const nextBrowser: { browser: string } = { browser };

        const prevBrowsers = await readData(filename) || [];
        prevBrowsers.push(nextBrowser);

        await writeData(filename, prevBrowsers);
        console.log('Data has been written to browseros-data.json');
    } catch (error) {
        throw new Error(`An error occurred while writing to browseros-data.json: ${error}`);
    };

    try {
        const apiUrl: string = `${process.env.NEXTAUTH_URL}/api/dashboard/publicip`;
        
        const res = await fetch(apiUrl);
        const ipResult: {data: {ip: string}} = (await res.json()) as {data: {ip: string}};

        if (!ipResult) {
            throw new Error("No public IP detected");
        } else {
            console.log("Public IP detected");
        };
        
        const ipFilename: string = './utils/ip-data.json';
        
        try {
            const file = await readData(ipFilename) || [];
            file.push(ipResult);

            await writeData(ipFilename, file);
            console.log('Data has been written to ip-data.json');
        } catch (err) {
            throw new Error(`An error occurred while writing to ip-data.json: ${err}`);
        };
    } catch (error) {
        throw new Error(`An error occurred while fetching public IP: ${error}`); 
    };
    return NextResponse.json({ message: "browser & os detected" }, { status: 200 });
};
