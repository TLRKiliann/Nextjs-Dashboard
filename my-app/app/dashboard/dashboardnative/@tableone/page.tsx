//import type { CustomersProps } from '@/lib/definitions';
import { PrismaClient, type User } from '@prisma/client';
import Image from 'next/image';
import TablePage from '@/components/TablePage';

const prisma = new PrismaClient();

export default async function TableOnePage() {

    /* const response = await fetch("http://localhost:3000/api/customers");
    if (!response) {
        //throw new Error("Error: server cannot fetch customers");
        console.error("Error with server, unable to obtain response for clients");
    };
    
    const customers = (await response.json()) as CustomersProps[];
 */
    const users: User[] = await prisma.user.findMany({
        orderBy: {
            id: "asc"
        }
    })

    if (!users) {
        throw new Error("users cannot be fetched by prisma");
    }

    return (
        <TablePage title="Members" url="" link="">

            <div className='relative top-0 h-[80%] z-10'>

                <ul className='w-full h-[100%] bg-slate-100 overflow-y-scroll no-scrollbar
                    flex flex-col items-center rounded-lg px-2 shadow-in'>

                    {users.map((customer: User) => (
                        <li key={customer.id} className='w-full bg-slate-50 my-2 shadow-sm-out rounded-lg'>

                            <div className='flex items-center justify-between text-slate-500/90 px-2'>
                                
                                <div className='flex flex-row items-center justify-start'>
                                    <Image priority src={String(customer.image)} width={500} height={333} alt="no-img" 
                                        className='w-[50px] h-auto border border-slate-500 object-cover my-1 rounded-full'/>

                                    <div className='w-[80px] mx-2'>
                                        <p className='text-base font-bold'>{customer.name}</p>
                                        {/* <p className='text-xs'>{customer.country}</p> */}
                                    </div>
                                </div>

                                <div className='w-[50%] flex flex-row items-center justify-between'>
                                    
                                    <div className="flex items-center">
                                        <p className={`${customer.isConnected === true ? "ml-0" : "-ml-[2px]"} text-sm mr-2`}>
                                            {customer.isConnected === true ? "Online" : "Offline"}
                                        </p>

                                        {customer.isConnected === true ? (
                                            <span className='w-[12px] h-[12px] bg-green-500 border border-slate-500/50 rounded-full'></span>
                                        ) : (
                                            <span className='w-[12px] h-[12px] bg-red-500 border border-slate-500/50 rounded-full'></span>
                                        )}
                                    </div>
                                
                                    {/* <p className='flex items-center justify-end text-sm font-bold'>{customer.spend}.-</p> */}    
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>

        </TablePage>
    )
}
