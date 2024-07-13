import { auth } from '@/auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import EmailForm from '@/components/contact/email-form';

export const metadata: Metadata = {
    title: {
      absolute: "Contact"
    },
    description: "data to contact"
};

export default async function ContactPage() {

    const session = await auth();

    const user = session?.user;

    if (!user) {
        return redirect("/api/auth/signin");
    }

    return (
        <div className='flex flex-row items-center justify-around w-full min-h-screen bg-gradient-to-bl 
            from-sky-100 from-10% text-slate-700 to-slate-100 to-90%'>

            <div className='flex flex-col items-center justify-center w-full h-screen border border-red-400'>

                <div className='flex flex-col items-center w-[400px] h-auto bg-slate-50 rounded-lg shadow'>
                    
                    <div className='flex items-start justify-start w-full'>
                        <h2 className="pt-6 pb-2 pl-6 text-3xl">
                            Contact
                        </h2>
                    </div>

                    <div className='w-[330px] bg-slate-100/40 mx-auto my-4 px-4 py-6 rounded shadow-in'>

                        <div className='w-[80%] m-auto flex flex-row items-center justify-center py-1'>
                            <h3 className='w-2/5 font-bold'>Name:</h3>
                            <h3 className='w-3/5'>Admin User</h3>
                        </div>

                        <div className='w-[80%] m-auto flex flex-row items-center justify-center py-1'>
                            <p className='w-2/5 font-bold'>Email:</p>
                            <p className='w-3/5'>admin@prisma.io</p>
                        </div>
                        
                        <div className='w-[80%] m-auto flex flex-row items-center justify-center py-1'>
                            <p className='w-2/5 font-bold'>Phone:</p>
                            <p className='w-3/5'>079 444 76 78</p>
                        </div>
                        
                    </div>

                    <div className='w-[330px] bg-slate-100/40 mx-auto mt-4 mb-10 px-4 py-6 rounded shadow-in'>
                        
                        <div className='mb-1 pl-2'>
                            <h3 className='text-lg font-bold'>
                                Horaires
                            </h3>
                        </div>

                        <div className="w-[80%] m-auto flex items-center justify-center py-1">
                            <p className='w-3/5 h-full font-bold py-1'>Morning:</p>
                            <p className='h-full bg-slate-200/70 px-2 py-1 rounded'>08h00-12h00</p>
                        </div>

                        <div className="w-[80%] m-auto flex items-center justify-center py-1">
                            <p className='w-3/5 h-full font-bold py-1'>Afternoon:</p>
                            <p className='h-full bg-slate-200/70 px-2 py-1 rounded'>14h00-18h00</p>
                        </div>

                        <div className="w-[80%] m-auto flex items-center justify-center py-1">
                            <p className='w-3/5 h-full font-bold py-1'>Saturday:</p>
                            <p className='h-full bg-slate-200/70 px-2 py-1 rounded'>14h00-18h00</p>
                        </div>
        
                    </div>
                </div>

            </div>

            <div className='flex flex-col items-center justify-center w-full h-screen border border-cyan-400'>
                
                <div className='flex flex-col items-center w-[400px] h-auto bg-slate-50 rounded-lg shadow'>
                  

                    <div className='flex items-start justify-start w-full'>
                        <h2 className="pt-6 pb-2 pl-6 text-3xl">
                            Send a message
                        </h2>
                    </div>

                    <EmailForm />


                </div>

            </div>

        </div>
    )
}
