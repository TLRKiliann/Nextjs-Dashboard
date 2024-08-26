// pages/api/checkAdmin.ts
import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await auth();
    const user = session?.user;

    if (!user || !user?.email) {
        return NextResponse.json({ isAdmin: false }, {status: 401});
    };

    const admin = await prisma.user.findUnique({
        where: {
            email: user.email,
            role: "ADMIN"
        }
    });

    return NextResponse.json({ isAdmin: !!admin }, {status: 200});
};
