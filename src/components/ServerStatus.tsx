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
  players: string[];
  version: string;
};

export function ServerStatus({ initialData }: { initialData: ServerSnapshot }) {
  const [data, setData] = useState<ServerSnapshot>(initialData);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const copyIP = async () => {
    const full = `${data.ipAddress ?? 'harbormc.falix.dev'}:${data.port ?? '25565'}`;
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — ignore
    }
  };

  const online = data.status === 'online';

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
        <p className="mt-4 text-sm text-slate-400">Raising anchor, loading harbor status...</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {loading ? 'Refreshing...' : lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : ''}
        </span>
        {/* Logo in corner */}
        <div>
          <img
            src="/logo.png"
            alt="HarborMC"
            className="h-14 w-14 rounded-xl shadow-lg shadow-cyan-500/20 animate-float"
          />
        </div>
      </div>

      <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* ============ HERO ============ */}
        <div className="glass-card relative overflow-hidden rounded-3xl p-8 text-center">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-48 w-[120%] -translate-x-1/2 bg-cyan-400/10 blur-3xl" />
          <img
            src="/logo.png"
            alt="HarborMC"
            className="mx-auto h-24 w-24 rounded-2xl shadow-2xl shadow-cyan-500/30 animate-float"
          />
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.45em] text-cyan-300">
            Harbor Dashboard
          </p>
          <h1 className="text-glow mt-2 text-4xl font-extrabold text-white md:text-5xl">
            HarborMC
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Drop anchor, gather your crew, and set sail on a community-focused survival server.
          </p>

          {/* Status pill */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${
                online
                  ? 'border-teal-400/50 bg-teal-900/50 text-teal-200'
                  : 'border-red-400/50 bg-red-900/50 text-red-200'
              }`}
            >
              <span
                className={`status-dot inline-block h-2.5 w-2.5 rounded-full ${
                  online ? 'bg-teal-300' : 'bg-red-300'
                }`}
              />
              {online ? 'Server online' : 'Server offline'}
            </span>
            <span className="rounded-full border border-cyan-400/30 bg-cyan-900/40 px-4 py-1.5 text-sm text-cyan-200">
              👥 {data.users ?? '0'} players
            </span>
          </div>

          {/* Copy IP */}
          <button
            onClick={copyIP}
            className="btn-shimmer mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3 font-bold text-slate-950 transition hover:from-cyan-300 hover:to-sky-400 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            {copied ? (
              <>✓ Copied!</>
            ) : (
              <>
                ⚓ {data.ipAddress ?? 'harbormc.falix.dev'}:{data.port ?? '25565'}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </>
            )}
          </button>
        </div>

        {/* ============ STAT CARDS ============ */}
        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Players" value={data.users ?? '—'} accent="cyan" icon="👥" />
          <StatCard label="IP address" value={data.ipAddress ?? '—'} accent="blue" icon="🌐" />
          <StatCard label="Bedrock port" value={data.port ?? '—'} accent="sky" icon="🔌" />
          <StatCard label="Uptime" value={data.uptime ?? '—'} accent="emerald" icon="⏱️" />
        </section>

        {/* ============ DETAILS ============ */}
        <section className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="glass-card rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-white">Server Overview</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <InfoRow label="Domain" value={data.domain ?? '—'} />
              <InfoRow label="Version" value={data.version ?? '—'} />
              <InfoRow label="Ping" value={data.ping ?? '—'} />
              <InfoRow label="Status" value={data.status ?? '—'} />
              <InfoRow label="Discord" value="Click to join" link="https://discord.gg/juNs35nM5z" />
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <h2 className="text-lg font-semibold text-white">About HarborMC</h2>
            <div className="mt-3 space-y-2 text-sm text-cyan-100">
              <p>⚓ <strong>Welcome to HarborMC!</strong></p>
              <p>HarborMC is a community-focused survival server where your adventure is yours to create. Build thriving towns, explore a massive world, trade with other players, and forge lasting friendships. Whether you&apos;re a seasoned builder, fearless explorer, redstone engineer, or casual player, there&apos;s a place for you in our harbor.</p>
              <p>We strive to provide a fair, welcoming experience with an active staff team, a balanced economy, Java &amp; Bedrock crossplay, and regular improvements driven by community feedback.</p>
              <p>Drop anchor, gather your crew, and begin your journey. Every legend starts somewhere.</p>
            </div>
          </div>

          <div className="glass-card rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-5">
            <h2 className="text-lg font-semibold text-white">Start the Server</h2>
            <p className="mt-2 text-sm text-cyan-100">Server offline? Click to DM me on Discord to start it up.</p>
            <a
              href="https://discord.gg/juNs35nM5z"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-2 text-center font-semibold text-slate-950 transition hover:from-cyan-300 hover:to-sky-400"
            >
              Join Discord
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

function StatCard({ label, value, accent, icon }: { label: string; value: string; accent: string; icon: string }) {
  const accentMap: Record<string, string> = {
    cyan: 'border-cyan-300/40 bg-cyan-900/30 text-cyan-100',
    blue: 'border-sky-300/40 bg-sky-900/30 text-sky-100',
    sky: 'border-sky-400/40 bg-sky-900/40 text-sky-100',
    amber: 'border-amber-300/40 bg-amber-900/30 text-amber-100',
    emerald: 'border-teal-300/40 bg-teal-900/30 text-teal-100',
  };

  return (
    <div className={`rounded-2xl border p-4 ${accentMap[accent]} transition hover:scale-[1.02] hover:shadow-lg`}>
      <div className="flex items-center gap-2 text-sm text-cyan-200">
        <span>{icon}</span>
        <span>{label}</span>
      </div>
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
