import { EmailProps } from '@/lib/definitions';
import prisma from '@/prisma/prisma';
import OpenEmail from './action-email/open-email';
import CloseEmail from './action-email/close-email';
import RemoveEmail from './action-email/remove-email';

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
            isOpen: true,
            createdAt: true,
        }
    });

    // create scroll to display severals msg

    return (
        <div className='flex flex-row items-start w-full h-[90%] text-slate-900 mt-[10vh]'>

            <div className='w-[500px]'>

                {emailBox.map((email: EmailProps) => (
                    <div key={email.id} className='w-full h-full bg-white border-b border-slate-300 p-2'>

                        <div className='flex justify-end w-full bg-slate-900'>
                            {email.isOpen === false ? (
                                <OpenEmail 
                                    id={email.id}
                                />
                            ) : (
                                <CloseEmail 
                                    id={email.id}
                                />
                            )}

                            <RemoveEmail 
                                id={email.id} 
                            />

                        </div>
                        
                        <p className='text-base font-bold pt-2'>{email.email}</p>
                        <p className='text-sm py-2'>{String(email.createdAt).slice(0, 24)}</p>
                    </div>
                ))}

            </div>

            <div className='w-full border border-red-500'>

                {emailBox.map((email: EmailProps) => email.isOpen === true ? (

                    <div key={email.id} className='w-full h-full bg-white'>

                        <div className='w-full h-auto text-slate-50 bg-slate-800 p-2'>
                            <p className='text-base font-bold py-1'>{email.email}</p>
                            <p className='text-sm pb-1'>{String(email.createdAt).slice(0, 24)}</p>
                        </div>

                        <div className='flex flex-col items-start justify-between w-full h-auto bg-white p-2'>
                            <p className='text-lg mb-10'>{email.message}</p>
                            <p className='text-base font-bold text-slate-700 py-1'>{email.email}</p>
                        </div>

                    </div>

                ) : null)}

            </div>
        </div>
    )
}
