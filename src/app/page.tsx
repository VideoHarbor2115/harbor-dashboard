import PageShell from '@/components/PageShell';
import { ServerStatus } from '@/components/ServerStatus';
import { ServerStatusProvider } from '@/components/ServerStatusContext';
import { getServerStatus } from '@/lib/server-status';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const data = await getServerStatus();
  const isOnline = data.status === 'online';

  return (
    <ServerStatusProvider initialOnline={isOnline}>
      <PageShell>
        <div className="mx-auto max-w-6xl">
          <ServerStatus initialData={data} />
        </div>
      </PageShell>
    </ServerStatusProvider>
  );
}
