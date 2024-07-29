import prisma from "@/prisma/prisma";
import type { User } from "@prisma/client";
import Image from 'next/image';
import QuantityPrice from "./quantity-price";

export default async function AllUserProfiles() {

  const users: User[] = await prisma.user.findMany({
    orderBy: {
      id: "asc"
    }
  });

  if (users.length === 0) {
    throw new Error("Error: fetch users failed!");
  };

  return (
    <div className="flex flex-col justify-center w-full h-full text-slate-200">

      <div className='relative mt-0 h-[100%] z-10'>

        <div className="absolute -z-10 overflow-y-scroll no-scrollbar w-full h-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-rows-none gap-4">
          
          {users.map((user: User) => (
            <div key={user.id} className="flex flex-row w-[320px] h-[260px] m-auto 
              bg-gradient-to-tr from-slate-600 from-10% to-slate-900 to-90%
            bg-slate-300 rounded-lg shadow-sm-out">
              
              <div className="absolute mt-4 ml-4">
                <Image
                  src={String(user.image)}
                  width={500}
                  height={333}
                  alt="no img"
                  className="w-[60px] h-[60px] object-cover rounded-full"
                />
              </div>

              <div className="flex flex-col justify-between w-full h-full p-4">
                
                <div className="flex flex-col items-start justify-around h-[60px] bg-slate-200 pl-[70px] rounded">
                  <h3 className="text-lg font-bold text-slate-700 mt-1">{user.name}</h3>
                  <h4 className="text-sm font-bold text-slate-700 mb-2">{user.email}</h4>
                </div>

                <QuantityPrice id={user.id} styles="text-slate-300 bg-slate-700" />

                <div className="text-slate-400 p-2 rounded">

                  <div className="flex flex-row items-center justify-between mb-[1px]">
                    <p className="text-sm">Created at:&nbsp;</p>
                    <p className="text-sm">{String(user.createdAt).slice(0, 24)}</p>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <p className="text-sm">Update at:&nbsp;</p>
                    <p className="text-sm">{String(user.updatedAt).slice(0, 24)}</p>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  )
};
