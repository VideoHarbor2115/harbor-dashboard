'use client';

import Navbar from '@/components/Navbar';
import SeaBackground from '@/components/SeaBackground';
import { useServerStatus } from '@/components/ServerStatusContext';

export default function Extras() {
  const { isOnline } = useServerStatus();

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      <SeaBackground isOffline={!isOnline} />
      <Navbar />
      
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-white text-glow">Extras</h1>
        
        <div className="grid gap-4 md:grid-cols-2">
          <a href="#" className="glass-card rounded-2xl p-6 hover:border-cyan-400/50 transition">
            <div className="text-3xl mb-3">🎮</div>
            <h2 className="text-xl font-semibold text-white">Dynmap</h2>
            <p className="mt-2 text-slate-400">Explore the world in real-time</p>
          </a>
          
          <a href="#" className="glass-card rounded-2xl p-6 hover:border-cyan-400/50 transition">
            <div className="text-3xl mb-3">🛒</div>
            <h2 className="text-xl font-semibold text-white">Store</h2>
            <p className="mt-2 text-slate-400">Support the server</p>
          </a>
          
          <a href="#" className="glass-card rounded-2xl p-6 hover:border-cyan-400/50 transition">
            <div className="text-3xl mb-3">📋</div>
            <h2 className="text-xl font-semibold text-white">Ban List</h2>
            <p className="mt-2 text-slate-400">View banned players</p>
          </a>
          
          <a href="#" className="glass-card rounded-2xl p-6 hover:border-cyan-400/50 transition">
            <div className="text-3xl mb-3">📊</div>
            <h2 className="text-xl font-semibold text-white">Stats</h2>
            <p className="mt-2 text-slate-400">Server statistics</p>
          </a>
        </div>
      </div>
    </main>
  );
}
