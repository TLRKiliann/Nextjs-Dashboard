import Link from "next/link";
import Image from 'next/image';
import imgLand from '@/public/assets/images/bg/landscape-contact.jpg';

export default function Home() {
  //bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-200 from-0% to-sky-500 to-70% 
  //bg-gradient-to-br from-slate-50 to-sky-500
  return (
    <div className="absolute -z-20 w-full min-h-screen flex flex-col items-center justify-center 
      bg-gradient-to-br from-slate-50 to-sky-500 p-4">


      <div className="absolute w-[650px] h-[390px] flex items-center justify-center bg-sky-200/70 opacity-60 shadow-in rounded">
        <div className="absolute -z-10 flex items-center justify-center w-[500px] h-[260px] bg-purple-700 rounded shadow-sm-out">
          <Image
            src={imgLand}
            priority={true}
            width={1920}
            height={1080}
            alt="no img" 
            className="fixed -z-10 w-[600px] h-auto opacity-70 object-cover rounded shadow-out"
          />
        </div>
      </div>

      <div className="absolute h-[240px] pt-6 z-0 ">
        <h1 className="text-3xl font-bold text-slate-100">Dashboard - Project</h1>
      </div>

      <div className="mt-16 w-[500px] h-auto flex flex-col items-center justify-cemter">
        
        <ul className="list-none">

          <li className="transform duration-100 ease-in-out text-slate-100 hover:text-cyan-200 hover:scale-105 active:text-cyan-300 active:scale-95 py-1">
            <Link href="/dashboard/dashboardnative">Dashboard (login as admin required)</Link>
          </li>

          <li className="transform duration-100 ease-in-out text-slate-100 hover:text-cyan-200 hover:scale-105 active:text-cyan-300 active:scale-95 py-1">
            <Link href="/products">Products (login as user required)</Link>
          </li>

          <li className="transform duration-100 ease-in-out text-slate-100 hover:text-cyan-200 hover:scale-105 active:text-cyan-300 active:scale-95 py-1">
            <Link href="/profile">Profile (login as user required)</Link>
          </li>

          <li className="transform duration-100 ease-in-out text-orange-300 hover:text-orange-400 hover:scale-105 active:text-orange-500 active:scale-95 py-1">
            <Link href="/products-list">Products list (login as user required)</Link>
          </li>
        
        </ul>

      </div>

    </div>
  );
};
