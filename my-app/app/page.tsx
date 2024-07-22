import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    absolute: "Wellcome",
  },
  description: 'wellcome page',
};

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen 
      bg-gradient-to-tr from-slate-800 to-slate-950 p-4">

      <div className="h-[20%]">
        <h1 className="text-2xl font-bold text-slate-100">Dashboard- Project</h1>
      </div>

      <div className="mt-20">
        <li className="list-none transform durantion-100 ease-in-out text-blue-500 hover:text-blue-400 hover:scale-105 active:text-blue-700">
          <Link href="/dashboard/dashboardnative">Dashboard (login as admin required)</Link>
        </li>

        <li className="list-none transform durantion-100 ease-in-out text-blue-500 hover:text-blue-400 hover:scale-105 active:text-blue-700">
          <Link href="/products">Products (login as user required)</Link>
        </li>

        <li className="list-none transform durantion-100 ease-in-out text-blue-500 hover:text-blue-400 hover:scale-105 active:text-blue-700">
          <Link href="/profile">Profile (login as user required)</Link>
        </li>

      </div>
    </div>
  );
}
