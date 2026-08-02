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
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  // Initial load with animation
  useEffect(() => {
    fetchStatus().then(() => setIsVisible(true));
  }, []);

  // Poll every 30 seconds
  useEffect(() => {
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Loading screen
  if (loading && !lastUpdated) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="animate-pulse">
          <img 
            src="/logo.png" 
            alt="HarborMC" 
            className="h-24 w-24 rounded-2xl"
          />
        </div>
        <div className="mt-6 flex items-center gap-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '0ms' }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '150ms' }} />
          <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="mt-4 text-sm text-slate-400">Loading harbor status...</p>
      </div>
    );
  }

  return (
    <>
      {/* Logo in corner */}
      <div className="absolute right-6 top-6 animate-[fadeIn_0.5s_ease-out]">
        <img 
          src="/logo.png" 
          alt="HarborMC" 
          className="h-16 w-16 rounded-xl shadow-lg shadow-cyan-500/20 animate-float"
        />
      </div>
      <div className="mb-4 flex items-center justify-start">
        <span className="text-xs text-slate-400">
          {loading ? 'Refreshing...' : lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : ''}
        </span>
      </div>

      <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Harbor Dashboard</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Falix VM Status Board</h1>
          <p className="mt-2 text-slate-300">A public-facing harbor-inspired view of your server health and availability.</p>
        </div>
        <div
          className={`rounded-2xl border px-5 py-3 text-sm ${
            data.status === 'online'
              ? 'border-teal-400/40 bg-teal-900/40 text-teal-200'
              : 'border-red-400/40 bg-red-900/40 text-red-200'
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

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-900/30 p-5">
          <h2 className="text-lg font-semibold text-white">Server Overview</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <InfoRow label="Domain" value={data.domain ?? '—'} />
            <InfoRow label="Ping" value={data.ping ?? '—'} />
            <InfoRow label="Status" value={data.status ?? '—'} />
            <InfoRow label="Discord" value="Click to join" link="https://discord.gg/juNs35nM5z" />
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-300/20 bg-cyan-900/30 p-5">
          <h2 className="text-lg font-semibold text-white">Server Description</h2>
          <p className="mt-3 text-sm text-cyan-100">
            A welcoming Minecraft server community on Falix hosting. 
            Join us for survival, building, and fun events. 
            Java and Bedrock players welcome!
          </p>
        </div>

        <div className="rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-5">
          <h2 className="text-lg font-semibold text-white">Start the Server</h2>
          <p className="mt-2 text-sm text-cyan-100">Server offline? Click to DM me on Discord to start it up.</p>
          <a 
            href="https://discord.gg/juNs35nM5z" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 block rounded-xl bg-cyan-400 px-4 py-2 text-center font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Join Discord
          </a>
        </div>
      </section>
      </div>
    </>
  );
}

function StatCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  const accentMap: Record<string, string> = {
    cyan: 'border-cyan-300/40 bg-cyan-900/30 text-cyan-100',
    blue: 'border-sky-300/40 bg-sky-900/30 text-sky-100',
    amber: 'border-amber-300/40 bg-amber-900/30 text-amber-100',
    emerald: 'border-teal-300/40 bg-teal-900/30 text-teal-100',
  };

  return (
    <div className={`rounded-2xl border p-4 ${accentMap[accent]}`}>
      <div className="text-sm text-cyan-200">{label}</div>
      <div className="mt-2 text-2xl font-bold text-white">{value}</div>
    </div>
  );
}

function InfoRow({ label, value, link }: { label: string; value: string; link?: string }) {
  const content = (
    <>
      <div className="text-xs uppercase tracking-[0.24em] text-cyan-300">{label}</div>
      <div className="mt-1 text-sm font-medium text-white">{value}</div>
    </>
  );

  if (link) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="rounded-xl border border-cyan-300/20 bg-cyan-900/30 px-3 py-2 transition hover:bg-cyan-800/40"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-cyan-300/10 bg-cyan-900/20 px-3 py-2">
      {content}
    </div>
  );
}
