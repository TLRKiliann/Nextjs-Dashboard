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
        const ipObject: {ip: string} = { ip: publicIp };
        await writeIp(filename, ipObject);
    } catch (error) {
        return NextResponse.json({ error: `An error occurred: ${error}` }, { status: 500 });
    };

    return NextResponse.json({ message: "Public IP has been written - done!" }, { status: 200 });
};
