import { auth } from '@/auth';
import AdminTasks from './reminder-tasks/admin-tasks'
import prisma from '@/prisma/prisma';

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
