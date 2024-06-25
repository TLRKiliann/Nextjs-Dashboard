import Link from "next/link";

export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen 
      bg-gradient-to-tr from-slate-800 to-slate-950 p-4">

      <div className="h-[20%]">
        <h1 className="text-2xl font-bold text-slate-100">Dashboard- Project</h1>
      </div>

      <div className="transform durantion-100 ease-in-out text-blue-500 hover:text-blue-400 hover:scale-105 active:text-blue-700 mt-20">
        <li className="list-none">
          <Link href="/dashboard/dashboardnative">Dashboard</Link>
        </li>
      </div>

    </main>
  );
}
