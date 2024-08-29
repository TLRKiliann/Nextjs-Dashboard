import Link from "next/link";
import Image from 'next/image';
import Carousel from "@/components/Carousel";
import imgLand from '@/public/assets/images/bg/landscape-contact.jpg';

export default function Home() {
  return (
    <div className="absolute -z-20 w-full min-h-screen flex flex-col items-center justify-center 
      text-slate-300 bg-gradient-to-br from-slate-50 to-sky-500 p-4">

      <div className="absolute -z-30 top-0 right-0 w-full h-full">
        <Carousel />
      </div>

      <div className="absolute -z-20 w-[650px] h-[390px] flex items-center justify-center 
        bg-gradient-to-br from-sky-200 to-sky-400 shadow-in rounded-lg">
        <div className="absolute -z-10 flex items-center justify-center w-[600px] h-[340px] 
          bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/60 from-50% to-purple-500/5 to-70% rounded-lg">
          <Image
            src={imgLand}
            priority={true}
            width={1920}
            height={1080}
            alt="no img" 
            className="fixed z-0 w-[600px] h-auto opacity-50 object-cover rounded shadow-out"
          />
        </div>
      </div>

      <div className="absolute h-[240px] pt-6 z-0 ">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-500 to-red-500 drop-shadow-text">Dashboard - Project</h1>
      </div>

      <div className="mt-[60px] w-[500px] h-auto flex flex-col items-center justify-cemter">
        
        <ul className="list-none">

          <li className="drop-shadow-text transform duration-100 ease-in-out hover:text-cyan-200 hover:scale-105 active:text-sky-400 active:scale-95 py-1">
            <Link href="/dashboard/dashboardnative">Dashboard (login as admin required)</Link>
          </li>

          <li className="drop-shadow-text transform duration-100 ease-in-out hover:text-cyan-200 hover:scale-105 active:text-sky-400 active:scale-95 py-1">
            <Link href="/products">Products (login as user required)</Link>
          </li>

          <li className="drop-shadow-text transform duration-100 ease-in-out hover:text-cyan-200 hover:scale-105 active:text-sky-400 active:scale-95 py-1">
            <Link href="/profile">Profile (login as user required)</Link>
          </li>

          <li className="drop-shadow-text transform duration-100 ease-in-out text-orange-300 hover:text-orange-400/70 hover:scale-105 active:text-orange-500 active:scale-95 py-1">
            <Link href="/products-list">Products list (login as user required)</Link>
          </li>
        
        </ul>

      </div>

    </div>
  );
};
