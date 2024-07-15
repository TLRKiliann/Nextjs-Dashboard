import { auth } from '@/auth';
import { EmailProps } from '@/lib/definitions';
import prisma from '@/prisma/prisma';
import OpenEmail from './action-email/open-email';
import CloseEmail from './action-email/close-email';
import RemoveEmail from './action-email/remove-email';
import ResponseAdminEmail from '../modal/response-admin-email';

//http://localhost:3000/dashboard/emails-admin

export default async function EmailsAdmin() {

    const session = await auth();
    const user = session?.user;

    const emailBox: EmailProps[] = await prisma.email.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            email: true,
            message: true,
            dst: true,
            isOpen: true,
            createdAt: true,
        }
    });

    if (!user) {
        //return console.log("There is an error!");
        throw new Error("An error occured!");
    };

    return (
        <div className='flex flex-row items-start w-full h-[90%] text-slate-800 mt-[10vh]'>

            <div className='relative mt-0 z-10 w-[35%] h-[100%]'>

                <div className='absolute -z-10 w-full h-full overflow-y-scroll no-scrollbar'>

                    {emailBox.map((email: EmailProps) => (
                        <div key={email.id} className='w-full h-auto bg-white border-b border-slate-300 p-2'>

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
            </div>

            <div className='relative mt-0 z-10 w-[65%] h-[100%]'>

                <div className='absolute -z-10 w-full h-full overflow-y-scroll no-scrollbar'>

                    {emailBox.map((email: EmailProps) => email.isOpen === true ? (
                        <div key={email.id} className='w-full h-auto bg-white'>
                            <div className='flex flex-row items-end justify-between w-full h-auto 
                                text-slate-50 bg-slate-800 rounded-tl rounded-bl p-2'>
                                <div>
                                    <p className='text-base font-bold py-1'>{email.email}</p>
                                    <p className='text-sm pb-1'>{String(email.createdAt).slice(0, 24)}</p>
                                </div>
                                <div className='py-1'>
                                    <ResponseAdminEmail id={email.id} dst={email.email} user={user} prevMsg={email.message} /> 
                                </div>
                            </div>
                            <div className='text-justify w-full h-auto bg-white border-l border-slate-200 p-4'>
                                <div className='flex flex-col items-start justify-between'>
                                    <p className='text-lg'>{email.message}</p>
                                    <p className='text-base font-bold text-slate-700 mt-10'>{email.email}</p>
                                </div>
                            </div>
                        </div>
                    ) : null)}
                </div>
            </div>
        </div>
    )
};