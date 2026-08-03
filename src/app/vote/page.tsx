'use client';

import Navbar from '@/components/Navbar';

export default function Vote() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      {/* Sea background animations */}
      <div className="sea-bg pointer-events-none absolute inset-0 -z-10" />
      
      <Navbar />
      
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-white">Vote for HarborMC</h1>
        
        <div className="grid gap-4 md:grid-cols-2">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group rounded-2xl border border-cyan-400/30 bg-cyan-900/30 p-6 transition hover:bg-cyan-800/40 hover:border-cyan-400/50"
          >
            <div className="text-3xl mb-3">🏆</div>
            <h2 className="text-xl font-semibold text-white group-hover:text-cyan-200 transition">PlanetMinecraft</h2>
            <p className="mt-2 text-cyan-200">Vote for us on PMC</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group rounded-2xl border border-cyan-400/30 bg-cyan-900/30 p-6 transition hover:bg-cyan-800/40 hover:border-cyan-400/50"
          >
            <div className="text-3xl mb-3">🌟</div>
            <h2 className="text-xl font-semibold text-white group-hover:text-cyan-200 transition">TopG</h2>
            <p className="mt-2 text-cyan-200">Vote for us on TopG</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group rounded-2xl border border-cyan-400/30 bg-cyan-900/30 p-6 transition hover:bg-cyan-800/40 hover:border-cyan-400/50"
          >
            <div className="text-3xl mb-3">📋</div>
            <h2 className="text-xl font-semibold text-white group-hover:text-cyan-200 transition">Minecraft Server List</h2>
            <p className="mt-2 text-cyan-200">Vote for us on MCSL</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group rounded-2xl border border-cyan-400/30 bg-cyan-900/30 p-6 transition hover:bg-cyan-800/40 hover:border-cyan-400/50"
          >
            <div className="text-3xl mb-3">💎</div>
            <h2 className="text-xl font-semibold text-white group-hover:text-cyan-200 transition">ServerPact</h2>
            <p className="mt-2 text-cyan-200">Vote for us on ServerPact</p>
          </a>
        </div>
        
        <p className="mt-8 text-center text-slate-400">
          🗳️ Voting helps us grow! Thank you for your support.
        </p>
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
