import { Metadata } from 'next';
import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import { redirect } from 'next/navigation';
import HeaderAuth from '@/components/auth/header-auth';
import UploadImage from "@/components/auth/upload-image";

export const metadata: Metadata = {
    title: "Settings",
    description: "settings page"
};

export default async function page() {

    const session = await auth();
    const user = session?.user;
    
    if (!user) {
        return redirect("/api/auth/signin");
    };

    // retrieve image from db
    const userImg = await prisma.user.findUnique({
        where: {
            email: user.email!,
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

                <div>
                    <UploadImage userImg={userImg?.image} />
                </div>

            </div>
        </>
    )
}
