import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import Link from 'next/link';

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
