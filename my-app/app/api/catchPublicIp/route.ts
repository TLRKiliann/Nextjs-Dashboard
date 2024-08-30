import { auth } from "@/auth";
import { writeIp } from "@/utils/api-request";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body: string = await req.json();
    if (!body) {
        return NextResponse.json({ message: "browser failed" });
    };
    const publicIp: string = body;
    const filename: string = './utils/publicIp.json';

    // authorization
    const session = await auth();
    const user = session?.user;

    if (!user) {
        return Response.json({error: "Unauthorized"}, {status: 401});
    };

    try {
        await writeIp(filename,  publicIp);
        console.log('Public IP has been written to publicIp.json');
    } catch (error) {
        throw new Error(`An error occurred while writing to publicIp.json: ${error}`);
    };

    return NextResponse.json({message: "Public IP has been written - done!"}, {status: 200});
};
