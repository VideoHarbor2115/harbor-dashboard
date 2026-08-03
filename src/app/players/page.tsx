'use client';

import Navbar from '@/components/Navbar';
import SeaBackground from '@/components/SeaBackground';
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

export default function PlayersPage() {
  const [data, setData] = useState<ServerSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      <SeaBackground />
      <Navbar />

      <div className="mx-auto max-w-4xl glass-card rounded-3xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Harbor Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-white">Players Online</h1>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400">
              {loading ? 'Refreshing...' : lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : ''}
            </span>
          </div>
        </div>

        {loading && !data ? (
          <div className="flex min-h-[40vh] flex-col items-center justify-center">
            <div className="animate-pulse">
              <img src="/logo.png" alt="HarborMC" className="h-16 w-16 rounded-2xl" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '0ms' }} />
              <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '150ms' }} />
              <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        ) : data?.players && data.players.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.players.map((player, index) => (
              <div
                key={index}
                className="glass-card flex items-center gap-3 rounded-xl px-4 py-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/30 text-lg font-bold text-cyan-100">
                  {player.charAt(0).toUpperCase()}
                </div>
                <span className="text-lg font-medium text-cyan-100">{player}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[30vh] flex-col items-center justify-center text-center">
            <div className="rounded-full bg-cyan-900/50 p-4">
              <svg className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="mt-4 text-lg text-slate-300">No players online</p>
            <p className="mt-1 text-sm text-slate-500">Check back later to see who is playing</p>
          </div>
        )}

        {data && (
          <div className="mt-6 border-t border-cyan-400/20 pt-4">
            <p className="text-center text-sm text-slate-500">
              {data.players?.length || 0} player(s) online • Auto-refreshes every 30s
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="mt-12 text-center">
        <div className="mx-auto max-w-2xl rounded-2xl border border-cyan-400/10 bg-cyan-950/30 px-6 py-3 backdrop-blur">
          <p className="text-sm text-slate-400">
            ⚓ <span className="text-cyan-300">HarborMC</span> &mdash; Fair winds and following seas, sailor!
          </p>
        </div>
      </footer>
    </main>
  );
}
