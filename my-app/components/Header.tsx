import { EmailProps } from '@/lib/definitions';
import { auth, signOut } from '@/auth';
import prisma from '@/prisma/prisma';
import EmailComp from './header-items/EmailComp';
import Notifications from './header-items/Notifications';
import Searchbar from './header-items/Searchbar';
import { FaPowerOff } from "react-icons/fa6";

const Header = async () => {
    
    const session = await auth();
    const user = session?.user;
  
    if (!user) {
        return null;
    } else if (!user.email) {
        return null;
    };

    const admin = await prisma.user.findUnique({
        where: {
            email: user.email,
            role: "ADMIN",
        }
    });

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

    const logoutAction = async () => {
        'use server';
        await signOut({
            redirect: true,
            redirectTo: 'http://localhost:3000/login',
        });
    };

    return (
        <div className='flex items-center justify-end w-full'>

            <nav className='w-full flex flex-col items-center'>
                
                <ul className='w-full flex items-center justify-end'>

                    <li className='flex items-center justify-center text-base text-slate-500/80 
                        transition duration-200 ease-in-out hover:text-slate-500'>
                        <Searchbar />
                    </li>

                    <div className='flex items-center justify-evenly w-[200px]'>

                        <li className='flex items-center justify-center text-base text-slate-500/80 pl-4'>
                            <Notifications />
                        </li>

                        <li className='flex items-center justify-center text-base text-slate-500/80 px-4'>
                            <EmailComp emailBox={emailBox} />
                        </li>
                        {admin ? (
                            <form action={logoutAction} className='flex pr-4'>
                                <li className='flex items-center justify-center text-base text-slate-500/80 
                                    transition duration-200 ease-in-out hover:text-slate-500'>
                                    <button>
                                        <FaPowerOff size={16} />
                                    </button>
                                </li>
                            </form>
                        ): null}
                    </div>
                </ul>
            </nav>
        </div>
    )
}
export default Header;