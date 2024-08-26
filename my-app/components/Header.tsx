import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import type { Message, User } from '@prisma/client';
import { redirect } from 'next/navigation';
import EmailComp from './header-items/EmailComp';
import Notifications from './header-items/Notifications';
import Searchbar from './header-items/Searchbar';
import BtnLogout from './BtnLogout';

const Header = async () => {
    
    const session = await auth();
    const user = session?.user;
  
    if (!user?.id) {
        return redirect("/api/auth/signin");
    };
    
    const admin: User | null = await prisma.user.findUnique({
        where: {
            id: user.id,
            role: "ADMIN",
        }
    });

    const emailBox: Message[] = await prisma.message.findMany({
        orderBy: {
            createdAt: "desc",
        },
        select: {
            id: true,
            src: true,
            message: true,
            dst: true,
            isOpen: true,
            createdAt: true,
        }
    });

    return (
        <div className='flex items-center justify-end w-full text-slate-400'>

            <nav className='w-full flex flex-col items-center'>
                
                <ul className='w-full flex items-center justify-end'>

                    <li className='flex items-center justify-center text-base text-slate-500/90 
                        transition duration-200 ease-in-out hover:text-slate-500'>
                        <Searchbar />
                    </li>

                    <div className='flex items-center justify-evenly w-[200px]'>

                        <li className='flex items-center justify-center text-base pl-4'>
                            <Notifications />
                        </li>

                        <li className='flex items-center justify-center text-base px-4'>
                            <EmailComp emailBox={emailBox} />
                        </li>
                        {admin ? (
                            <BtnLogout />
                        ): null}
                    </div>
                </ul>
            </nav>
        </div>
    )
}
export default Header;