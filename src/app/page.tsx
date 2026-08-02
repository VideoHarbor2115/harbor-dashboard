import { getServerStatus } from '@/lib/server-status';
import { ServerStatus } from '@/components/ServerStatus';

// Always render live status on request — do not bake values at build time.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getServerStatus();

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      {/* Sea background animations */}
      <div className="sea-bg pointer-events-none absolute inset-0 -z-10" />
      
      <div className="mx-auto max-w-6xl rounded-3xl border border-cyan-400/20 bg-slate-950/60 p-6 shadow-2xl shadow-cyan-950/30 backdrop-blur">
        <ServerStatus initialData={data} />
      </div>
    </main>
  );
}
