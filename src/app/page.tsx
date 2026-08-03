import { getServerStatus } from '@/lib/server-status';
import { ServerStatus } from '@/components/ServerStatus';
import Link from 'next/link';

// Always render live status on request — do not bake values at build time.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getServerStatus();

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      {/* Sea background animations */}
      <div className="sea-bg pointer-events-none absolute inset-0 -z-10" />
      
      {/* Navigation */}
      <nav className="mb-8 flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-950/40 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="HarborMC" className="h-8 w-8 rounded-lg" />
          <span className="text-lg font-bold text-white">HarborMC</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-cyan-300 transition hover:text-cyan-100">Status</Link>
          <Link href="/players" className="text-slate-400 transition hover:text-cyan-300">Players</Link>
          <Link href="/vote" className="text-slate-400 transition hover:text-cyan-300">Vote</Link>
          <Link href="/social" className="text-slate-400 transition hover:text-cyan-300">Social</Link>
        </div>
      </nav>
      
      <div className="mx-auto max-w-6xl rounded-3xl border border-cyan-400/30 bg-cyan-950/50 p-6 shadow-2xl shadow-cyan-900/30 backdrop-blur">
        <ServerStatus initialData={data} />
      </div>
    </main>
  );
}
