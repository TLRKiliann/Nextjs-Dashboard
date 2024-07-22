import { auth } from '@/auth';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

const prisma = new PrismaClient();

export default async function AdminAccessLink() {

    const session = await auth();
    const user = session?.user;

    if (!user?.email) {
        return null;
    };
    const admin = await prisma.user.findUnique({
        where: {
            email: user.email,
            role: "ADMIN"
        }
    });

    if (!admin) {
        return null;
    };

    return (
        <>
        {admin ? (
            <li className="list-none text-violet-600 hover:text-violet-500 active:text-violet-400">
                <Link href="/dashboard/dashboardnative">Dashboard (admin)</Link>
            </li>
        ) : null}
        </>
    )
}
