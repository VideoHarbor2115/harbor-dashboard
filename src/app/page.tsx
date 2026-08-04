import PageShell from '@/components/PageShell';
import { ServerStatus } from '@/components/ServerStatus';
import { getServerStatus } from '@/lib/server-status';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getServerStatus();
  const isOffline = data.status !== 'online';

  return (
    <PageShell isOffline={isOffline}>
      <div className="mx-auto max-w-6xl">
        <ServerStatus initialData={data} />
      </div>
    </PageShell>
  );
}
