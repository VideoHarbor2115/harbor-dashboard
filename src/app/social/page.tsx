'use client';

import Navbar from '@/components/Navbar';
import SeaBackground from '@/components/SeaBackground';
import { useServerStatus } from '@/components/ServerStatusContext';

export default function Social() {
  const { isOnline } = useServerStatus();

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      <SeaBackground isOffline={!isOnline} />
      <Navbar />
      
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-white text-glow">Follow Us</h1>
        
        <div className="grid gap-4 md:grid-cols-2">
          <a 
            href="https://discord.gg/juNs35nM5z" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group glass-card rounded-2xl p-6"
          >
            <div className="text-3xl mb-3">💬</div>
            <h2 className="text-xl font-semibold text-white group-hover:text-indigo-200 transition">Discord</h2>
            <p className="mt-2 text-indigo-200">Join our community</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group glass-card rounded-2xl p-6"
          >
            <div className="text-3xl mb-3">▶️</div>
            <h2 className="text-xl font-semibold text-white group-hover:text-red-200 transition">YouTube</h2>
            <p className="mt-2 text-red-200">Subscribe to our channel</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group glass-card rounded-2xl p-6"
          >
            <div className="text-3xl mb-3">🐦</div>
            <h2 className="text-xl font-semibold text-white group-hover:text-sky-200 transition">Twitter / X</h2>
            <p className="mt-2 text-sky-200">Follow us for updates</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group glass-card rounded-2xl p-6"
          >
            <div className="text-3xl mb-3">📸</div>
            <h2 className="text-xl font-semibold text-white group-hover:text-pink-200 transition">Instagram</h2>
            <p className="mt-2 text-pink-200">See our latest posts</p>
          </a>
        </div>
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
