import { Metadata } from "next";
import { auth } from "@/auth";
import { writeFile } from "fs/promises";
import { redirect } from "next/navigation";
import prisma from "@/prisma/prisma";
import { ApiPublicIp } from "@/utils/api-request";
import Image from "next/image";
import HeaderAuth from '@/components/auth/header-auth';
import DataProfile from "@/components/auth/data-profile";
import OsBrowserData from "@/components/auth/os-browser-data";
import userLogo from "@/public/assets/images/users/user_icon.jpg";
import UploadImage from "@/components/auth/upload-image";

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

    // Retrieve public IP
    const ipResult = await ApiPublicIp();

    if (!ipResult) {
        throw new Error("No ip public detected");
    } else {
        console.log("Public IP detected");
    };

    const jsonData = JSON.stringify(ipResult);

    try {
        writeFile('./utils/data.json', jsonData);
        console.log('Data has been written to data.json');
    } catch (err) {
        throw new Error('An error occurred while writing to data.json:');
    };

    return (
        <>
            <HeaderAuth />
            <div className='flex flex-col justify-center w-[380px] xl:w-[500px] h-full m-auto text-slate-500 bg-white rounded-lg'>

                <div>
                    <UploadImage />
                </div>

                <div className='w-full flex flex-col items-center justify-center rounded-lg p-4 shadow-whitecustom'>

                    <div className="w-full h-full border border-slate-200 rounded-lg">

                        <div className='relative w-full flex justify-end bg-slate-100 rounded-tl-lg rounded-tr-lg'>
                            <Image src={user.image ? user.image : userLogo} width={200} height={100} alt="no img" 
                                className='w-[100px] h-auto object-fit rounded-tr-lg rounded-bl-lg shadow-md'
                            />
                        </div>

                        <div className="w-full h-full rounded-bl-lg rounded-br-lg">

                            <DataProfile varDef="Username:">
                                {user.email}
                            </DataProfile>
                            
                            <DataProfile varDef="Lastname:">
                                {user.name}
                            </DataProfile>

                            {/* <DataProfile varDef="Address:">
                                {user.address}
                            </DataProfile>

                            <DataProfile varDef="City:">
                                {user.city}
                            </DataProfile>

                            <DataProfile varDef="Country:">
                                {user.country}
                            </DataProfile>

                            <DataProfile varDef="Spend:">
                                {user.spend}.-
                            </DataProfile>

                            <DataProfile varDef="Articles:">
                                {user.artQuantity}
                            </DataProfile> */}

                            <OsBrowserData />

                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}
