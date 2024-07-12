import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import HeaderAuth from '@/components/auth/header-auth';
import DataProfile from "@/components/auth/data-profile";
import OsBrowserData from "@/components/auth/os-browser-data";
import userLogo from "@/public/assets/images/users/user_icon.jpg";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Login",
    description: "login page"
};

export default async function ProfilePage() {

    const session = await auth();

    const user = session?.user;
    if (!user) {
        return redirect("/api/auth/signin");
    }

    return (
        <>
            <HeaderAuth />
            <div className='flex flex-col justify-center w-[380px] xl:w-[500px] h-full m-auto bg-white rounded-lg'>

                <div className='w-full flex flex-col items-center justify-center rounded-lg'>

                    <div className='relative w-full flex justify-end bg-slate-100 rounded-tl-lg rounded-tr-lg'>
                        <Image src={user?.image ? user.image : userLogo} width={400} height={250} alt="no img" 
                            className='md:w-[100px] xl:w-[120px] h-auto object-fit rounded-tr-lg rounded-bl-lg shadow-md'
                        />
                    </div>

                    <div className="w-full rounded-bl-lg rounded-br-lg pl-4">

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
        </>
    )
}
