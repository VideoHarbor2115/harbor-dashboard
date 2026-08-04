'use client';

import Navbar from '@/components/Navbar';
import SeaBackground from '@/components/SeaBackground';
import { useServerStatus } from '@/components/ServerStatusContext';

export default function Map() {
  const { isOnline } = useServerStatus();

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      <SeaBackground isOffline={!isOnline} />
      <Navbar />
      
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-white text-glow">World Map</h1>
        
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="mb-4 text-6xl">🗺️</div>
          <h2 className="text-2xl font-semibold text-white">Coming Soon</h2>
          <p className="mt-4 text-slate-300 max-w-lg mx-auto">
            Our interactive world map is under development. Soon you&apos;ll be able to explore the HarborMC world, discover player bases, and find your way around.
          </p>
          
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-800/50 p-4">
              <div className="text-2xl mb-2">🏰</div>
              <h3 className="font-semibold text-white">Player Bases</h3>
              <p className="text-sm text-slate-400">Explore builds and towns</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 p-4">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-semibold text-white">Points of Interest</h3>
              <p className="text-sm text-slate-400">Find spawn, shops, and more</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 p-4">
              <div className="text-2xl mb-2">👤</div>
              <h3 className="font-semibold text-white">Player Locations</h3>
              <p className="text-sm text-slate-400">See who is where in real-time</p>
            </div>
            <div className="rounded-xl bg-slate-800/50 p-4">
              <div className="text-2xl mb-2">🧭</div>
              <h3 className="font-semibold text-white">Navigation</h3>
              <p className="text-sm text-slate-400">Get directions to any location</p>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-slate-400">
            Interested in helping set up Dynmap? Contact us on Discord!
          </p>
          
          <a 
            href="https://discord.gg/juNs35nM5z" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
          >
            Join Discord
          </a>
        </div>
      </div>
    </main>
  );
}
