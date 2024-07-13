import { EmailProps } from '@/lib/definitions';
import prisma from '@/prisma/prisma';

//http://localhost:3000/dashboard/emails-admin

export default async function EmailsAdmin() {

    const emailBox: EmailProps[] = await prisma.email.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            email: true,
            message: true,
            createdAt: true,
        }
    });

    return (
        <div className='text-slate-900'>
            {emailBox.map((email: EmailProps) => (
                <>
                    <div key={email.id} className='w-full'>
                        <p>{email.email}</p>
                        <p>{email.message}</p>
                        <p>{String(email.createdAt)}</p>
                    </div>
                    <button>
                        Send email
                    </button>
                </>
            ))}
        </div>
    )
}
