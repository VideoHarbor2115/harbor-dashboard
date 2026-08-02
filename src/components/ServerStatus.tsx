'use client';

import { useEffect, useState } from 'react';

type ServerSnapshot = {
  users: string;
  status: string;
  ipAddress: string;
  port: string;
  uptime: string;
  ping: string;
  domain: string;
};

export function ServerStatus({ initialData }: { initialData: ServerSnapshot }) {
  const [data, setData] = useState<ServerSnapshot>(initialData);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/server-info');
      const newData = (await res.json()) as ServerSnapshot;
      setData(newData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch status:', error);
    } finally {
      setLoading(false);
    }
  };

  // Poll every 30 seconds
  useEffect(() => {
    fetchStatus(); // Initial fetch
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="mb-4 flex items-center justify-end">
        <span className="text-xs text-slate-500">
          {loading ? 'Refreshing...' : lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : ''}
        </span>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Harbor Dashboard</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Falix VM Status Board</h1>
          <p className="mt-2 text-slate-300">A public-facing harbor-inspired view of your server health and availability.</p>
        </div>
        <div
          className={`rounded-2xl border px-5 py-3 text-sm ${
            data.status === 'online'
              ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
              : 'border-red-400/30 bg-red-500/10 text-red-200'
          }`}
        >
          {data.status === 'online' ? 'Server online' : 'Server offline'}
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Users" value={data.users ?? '—'} accent="cyan" />
        <StatCard label="IP address" value={data.ipAddress ?? '—'} accent="blue" />
        <StatCard label="Bedrock port" value={data.port ?? '—'} accent="amber" />
        <StatCard label="Uptime" value={data.uptime ?? '—'} accent="emerald" />
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
          <h2 className="text-lg font-semibold text-white">Server Overview</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <InfoRow label="Domain" value={data.domain ?? '—'} />
            <InfoRow label="Ping" value={data.ping ?? '—'} />
            <InfoRow label="Status" value={data.status ?? '—'} />
            <InfoRow label="Boot notification" value="Action available" />
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-5">
          <h2 className="text-lg font-semibold text-white">Secure control</h2>
          <p className="mt-2 text-sm text-slate-300">The site keeps sensitive credentials on the server and exposes only safe status data publicly.</p>
          <form action="/api/notify-bootup" method="post" className="mt-4">
            <button className="rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300">
              Notify bootup
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  const accentMap: Record<string, string> = {
    cyan: 'border-cyan-300/30 bg-cyan-500/10 text-cyan-100',
    blue: 'border-blue-300/30 bg-blue-500/10 text-blue-100',
    amber: 'border-amber-300/30 bg-amber-500/10 text-amber-100',
    emerald: 'border-emerald-300/30 bg-emerald-500/10 text-emerald-100',
  };

  return (
    <div className={`rounded-2xl border p-4 ${accentMap[accent]}`}>
      <div className="text-sm text-slate-300">{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/70 px-3 py-2">
      <div className="text-xs uppercase tracking-[0.24em] text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-medium text-white">{value}</div>
    </div>
  );
}
