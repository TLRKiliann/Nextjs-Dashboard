import Link from "next/link";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Dashboard- Project</h1>

      <Link href="/dashboard/dashboardnative">Dashboard</Link>

    </main>
  );
}
