import prisma from "@/prisma/prisma";
import Image from 'next/image';

export default async function AllUserProfiles() {

  const users = await prisma.user.findMany({
    include: {
      products: {
          select: {
              quantity: true,
              price: true,
          }
      }
    },
    orderBy: {
      email: "asc"
    }
  });

  if (!users) {
    throw new Error("Error: fetch users failed!");
  }

  return (
    <div className="flex flex-col justify-center w-full h-full text-slate-200">

        <div className="w-full h-full grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-rows-none gap-4">
          
          {users.map((user) => (
            <div key={user.email} className="flex flex-row w-[320px] h-[260px] m-auto 
              bg-gradient-to-tr from-slate-600 from-10% to-slate-900 to-90%
            bg-slate-300 rounded-lg shadow-sm-out">
              
              <div className="absolute mt-4 ml-4">
                <Image
                  src={String(user.image)}
                  width={500}
                  height={333}
                  alt="no img"
                  className="w-[60px] h-[60px] object-fit rounded-full"
                />
              </div>

              <div className="flex flex-col justify-between w-full h-full p-4">
                
                <div className="flex flex-col items-start justify-around h-[60px] bg-slate-200 pl-[70px] rounded">
                  <h3 className="text-lg font-bold text-slate-700 mt-1">{user.name}</h3>
                  <h4 className="text-sm font-bold text-slate-700 mb-2">{user.email}</h4>
                </div>
                
                <div className="w-[80%] m-auto">

                  <div className="flex flex-row items-center justify-between bg-slate-600 mb-2 p-2 rounded">
                    <p className="text-base font-bold">Quantity:&nbsp;</p>
                    <p className="text-base">result&nbsp;</p>
                  </div>

                  <div className="flex flex-row items-center justify-between bg-slate-600 p-2 rounded">
                    <p className="text-base font-bold">Total:&nbsp;</p>
                    <p className="text-base">result&nbsp;</p>
                  </div>

                </div>

                <div className="">

                  <div className="flex flex-row items-center justify-between mb-[1px]">
                    <p className="text-sm font-bold">Created at:&nbsp;</p>
                    <p className="text-sm">{String(user.createdAt).slice(0, 24)}</p>
                  </div>

                  <div className="flex flex-row items-center justify-between">
                    <p className="text-sm font-bold">Update at:&nbsp;</p>
                    <p className="text-sm">{String(user.updatedAt).slice(0, 24)}</p>
                  </div>

                </div>
              </div>

            </div>
          ))}

        </div>
    </div>
  )
};
