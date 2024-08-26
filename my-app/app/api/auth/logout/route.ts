import { auth, signOut } from "@/auth";
import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    if (req.method === "POST") {
        const session = await auth();
        const user = session?.user;
    
        if (!user?.id) {
            return NextResponse.json({message: "unauthorized"}, {status: 401})
        };
    
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                isConnected: false
            }
        });
        await prisma.$disconnect();
        return NextResponse.json({message: "logout success"}, {status: 200});
    };
    return NextResponse.json({message: "Method not allowed"}, {status: 405});
};