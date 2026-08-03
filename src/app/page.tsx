import { getServerStatus } from '@/lib/server-status';
import { ServerStatus } from '@/components/ServerStatus';
import PageShell from '@/components/PageShell';

// Always render live status on request — do not bake values at build time.
export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getServerStatus();

  return (
    <PageShell>
      <div className="mx-auto max-w-6xl rounded-3xl border border-cyan-400/30 bg-cyan-950/50 p-6 shadow-2xl shadow-cyan-900/30 backdrop-blur">
        <ServerStatus initialData={data} />
      </div>
    </PageShell>
  );
}
