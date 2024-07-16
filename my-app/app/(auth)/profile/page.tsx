import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image, { StaticImageData } from "next/image";
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

    /* const response = fetch("localhost:3000/api/imgupload");
    //const result = (await response.json() as string | StaticImageData);

    if (!response) {
        return null;
    } */

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
                            <Image src={user.image ? user.image : userLogo} width={400} height={250} alt="no img" 
                                className='md:w-[100px] xl:w-[120px] h-auto object-fit rounded-tr-lg rounded-bl-lg shadow-md'
                            />
                        </div>

                        <div className="w-full h-full rounded-bl-lg rounded-br-lg">

                            <DataProfile varDef="Username:">
                                {user?.email}
                            </DataProfile>
                            
                            <DataProfile varDef="Lastname:">
                                {user?.name}
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
