import { NextResponse, userAgent } from "next/server";
import { writeFile } from "fs/promises";
import { headers } from "next/headers";

export const GET = async (): Promise<NextResponse> => {

    const headersList = headers();
    const os = headersList.get('user-agent');
    console.log(os)

    try {
        await writeFile('./utils/browseros-data.json', JSON.stringify({os}));
        return NextResponse.json({ message: 'Browser information saved to data.json' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while saving browser information' });
    }
}
