import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import AdminTasks from '@/components/reminder-tasks/admin-tasks';

export default async function TasksModal(): Promise<JSX.Element | null> {

    const session = await auth();
    const user = session?.user;

    if (!user) {
        return null;
    };

    const admin = await prisma.user.findUnique({
        where: {
            id: user.id,
            role: "ADMIN"
        }
    });

    if (!admin) {
        return null;
    };

    return (
        <AdminTasks />
    );
};
