import { Metadata } from "next";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { readFile, writeFile } from "fs/promises";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ApiPublicIp } from "@/utils/api-request";
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
    
    if (!user) {
        return redirect("/api/auth/signin");
    };

    if (user) {
        await prisma.user.update({
            data: {
                email: user.email!,
                isConnected: true,
            },
            where: {
                email: user.email!,
            }
        })
    };

    // retrieve public IP
    const ipResult = await ApiPublicIp();

    if (!ipResult) {
        throw new Error("No ip public detected");
    } else {
        console.log("Public IP detected");
    };

    const filename = './utils/ip-data.json';
    try {
        const file = await readFile(filename, { encoding: 'utf8' });
        const previousIp = JSON.parse(file);
        previousIp.push(ipResult);
        await writeFile(filename, JSON.stringify(previousIp, null, 4));
        console.log('Data has been written to ip-data.json');
    } catch (err) {
        throw new Error('An error occurred while writing to ip-data.json:');
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

                <div className='w-full flex flex-col items-center justify-center rounded-lg p-4 shadow-whitecustom'>

                    <div className="w-full h-full border border-slate-200 rounded-lg">

                        <div className='relative flex justify-end bg-slate-100 rounded-tl-lg rounded-tr-lg'>
                            <Image 
                                src={userImg?.image ? userImg.image : userLogo}
                                priority={true}
                                unoptimized={false}
                                alt="Uploaded Image" width={500} height={333} 
                                className='w-[100px] h-auto object-fit'
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
                        active:text-blue-700 mt-4">
                        <Link href="/profile/settings">Settings</Link>
                    </div>

                </div>
            </div>
        </>
    )
}
