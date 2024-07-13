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
    // put an additionnal option in db (isOpened)
    // isOpen boolean

    return (
        <div className='flex flex-row items-start w-full h-[90%] bg-slate-900 text-slate-900 mt-[10vh]'>

            <div className='w-[40%] border border-red-500'>

                {emailBox.map((email: EmailProps) => (
                    <div key={email.id} className='w-full h-full bg-white'>

                        <div className='flex justify-end w-full bg-slate-900'>
                            <p className='absolute bg-blue-500 mt-1 mr-1'>Env</p>
                        </div>
                        
                        <p className='text-base font-bold px-2 py-2'>{email.email}</p>
                        <p className='text-sm px-2 pb-2'>{String(email.createdAt).slice(0, 24)}</p>
                    </div>
                ))}

            </div>

            <div className='w-[60%] border border-red-500'>

                {emailBox.map((email: EmailProps) => (

                    <div key={email.id} className='w-full h-full bg-white'>

                        <div className='w-full h-auto text-slate-50 bg-slate-800 p-2'>
                            <p className='text-base font-bold py-1'>{email.email}</p>
                            <p className='text-sm'>{String(email.createdAt).slice(0, 24)}</p>
                        </div>

                        <div className='flex flex-col items-start justify-between w-full h-auto bg-slate-200 p-2'>
                            <p className='text-lg mb-10'>{email.message}</p>
                            <p className='text-base font-bold text-slate-700 py-1'>{email.email}</p>
                        </div>

                    </div>

                ))}

            </div>
        </div>
    )
}
