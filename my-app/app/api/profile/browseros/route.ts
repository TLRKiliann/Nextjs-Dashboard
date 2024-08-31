import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { readData, writeData } from '@/utils/api-request';

export async function POST(request: Request) {
    const body = await request.json();
    if (!body || !body.browser || !body.ip) {
        return NextResponse.json({ message: "method post failed" }, { status: 400 });
    };

    // authorization
    const session = await auth();
    const user = session?.user;

    if (!user?.name) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    };

    const username = user.name;

    const browser: string = body.browser;
    const filename: string = './utils/browseros-data.json';

    if (!browser) {
        return NextResponse.json({message: "browser is not defined"}, {status: 400});
    };

    try {
        const nextBrowser: { browser: string; username: string } = { browser, username };

        const prevBrowsers = await readData(filename) || [];
        prevBrowsers.push(nextBrowser);

        await writeData(filename, prevBrowsers);
        console.log('Data has been written to browseros-data.json');
    } catch (error) {
        return NextResponse.json({ error: `An error occurred with browseros-data.json: ${error}` }, { status: 500 });
    };

    const dataIp: string = body.ip;
    const ipFilename: string = './utils/ip-data.json';

    if (!dataIp) {
        return NextResponse.json({message: "dataIp is not defined"}, {status: 400});
    };

    const ipResult: {dataIp: string; username: string} = { dataIp, username };

    if (!ipResult) {
        throw new Error("No public IP detected");
    } else {
        console.log("Public IP detected");
    };
    
    try {
        const file = await readData(ipFilename) || [];
        file.push(ipResult);

        await writeData(ipFilename, file);
        console.log('Data has been written to ip-data.json');
    } catch (err) {
        return NextResponse.json({ error: `An error occurred with ip-data.json: ${err}` }, { status: 500 });
    };

    return NextResponse.json({ message: "browser & os detected" }, { status: 200 });
};
