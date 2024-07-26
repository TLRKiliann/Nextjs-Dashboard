import type { Metadata } from "next";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HeaderAuth from '@/components/auth/header-auth';
import DataProfile from "@/components/auth/data-profile";
import OsBrowserData from "@/components/auth/os-browser-data";
import userLogo from "@/public/assets/images/users/user_icon.png";

export const metadata: Metadata = {
    title: "Profile",
    description: "profile page"
};

export default async function ProfilePage() {

    const session = await auth();
    const user = session?.user;
    
    if (!user?.id) {
        return redirect("/api/auth/signin");
    };


    if (user) {
        const currentDate = new Date();
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                isConnected: true,
                connections: {
                    create: {
                        createdAt: currentDate,
                    },
                },
            },
        });
    };

    // retrieve image from db
    const userImg = await prisma.user.findUnique({
        where: {
            id: user.id,
        },
        select: {
            image: true,
        }
    });

    if (!userImg) {
        throw new Error('An error occurred while importing image');
    };

    return (
        <>
            <HeaderAuth />
            <div className='flex flex-col justify-center w-[380px] xl:w-[500px] h-full m-auto text-slate-500 bg-white rounded-lg'>

                <div className='w-full flex flex-col items-center justify-center rounded-lg p-4 shadow-whitecustom'>

                    <div className="w-full h-full border border-slate-200 rounded-lg">

                        <div className='relative flex justify-end bg-slate-100 rounded-tr-lg'>
                            <Image 
                                src={userImg?.image ? userImg.image : userLogo}
                                priority={true}
                                unoptimized={false}
                                alt="Uploaded Image" width={500} height={333} 
                                className='w-[100px] h-auto object-cover rounded-tr-lg rounded-bl-lg'
                            />
                        </div>

                        <div className="w-full h-full rounded-bl-lg rounded-br-lg">

                            <DataProfile varDef="Username:">
                                {user.email}
                            </DataProfile>
                            
                            <DataProfile varDef="Lastname:">
                                {user.name}
                            </DataProfile>

                            <OsBrowserData />

                        </div>

                    </div>

                    <div className="w-full flex items-center justify-end text-blue-500 hover:text-blue-600 
                        active:text-blue-700 mt-4 bg-slate-100 border border-slate-200 rounded-lg px-2 py-1">
                        <Link href="/profile/settings">Settings</Link>
                    </div>

                </div>
            </div>
        </>
    )
}
