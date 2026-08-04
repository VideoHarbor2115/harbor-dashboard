'use client';

import Navbar from '@/components/Navbar';
import SeaBackground from '@/components/SeaBackground';
import { useServerStatus } from '@/components/ServerStatusContext';

export default function Gallery() {
  const { isOnline } = useServerStatus();

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      <SeaBackground isOffline={!isOnline} />
      <Navbar />
      
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-white text-glow">Gallery</h1>
        
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="text-6xl mb-4">📸</div>
          <h2 className="text-2xl font-semibold text-white mb-2">Coming Soon</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            We&apos;re preparing something special! Check back later for screenshots and highlights from the HarborMC community.
          </p>
        </div>
      </div>
    </main>
  );
}
