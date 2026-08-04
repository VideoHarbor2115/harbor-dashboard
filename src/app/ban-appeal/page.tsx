'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SeaBackground from '@/components/SeaBackground';
import { useServerStatus } from '@/components/ServerStatusContext';

export default function BanAppeal() {
  const { isOnline } = useServerStatus();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    discord: '',
    inGameName: '',
    reason: '',
    appeal: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to a backend or Discord webhook
    console.log('Ban appeal submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
        <SeaBackground isOffline={!isOnline} />
        <Navbar />
        <div className="mx-auto max-w-2xl">
          <div className="glass-card rounded-2xl p-8 text-center">
            <div className="mb-4 text-6xl">✅</div>
            <h1 className="text-2xl font-bold text-white">Appeal Submitted!</h1>
            <p className="mt-4 text-slate-300">
              Your ban appeal has been sent to our staff team. We&apos;ll review it and get back to you on Discord as soon as possible.
            </p>
            <a 
              href="https://discord.gg/juNs35nM5z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
            >
              Join Discord
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      <SeaBackground isOffline={!isOnline} />
      <Navbar />
      
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 text-4xl font-bold text-white text-glow">Ban Appeal</h1>
        <p className="mb-8 text-slate-300">
          If you believe your ban was a mistake or want to demonstrate changed behavior, submit an appeal below.
        </p>
        
        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 space-y-5">
          <div>
            <label htmlFor="discord" className="block text-sm font-medium text-slate-300 mb-2">
              Discord Username <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="discord"
              required
              placeholder="e.g., YourName#1234"
              className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              value={formData.discord}
              onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="inGameName" className="block text-sm font-medium text-slate-300 mb-2">
              In-Game Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="inGameName"
              required
              placeholder="Your Minecraft username"
              className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              value={formData.inGameName}
              onChange={(e) => setFormData({ ...formData, inGameName: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-slate-300 mb-2">
              Why were you banned? <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="reason"
              required
              placeholder="The reason shown when you were banned"
              className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
          </div>
          
          <div>
            <label htmlFor="appeal" className="block text-sm font-medium text-slate-300 mb-2">
              Why should we unban you? <span className="text-red-400">*</span>
            </label>
            <textarea
              id="appeal"
              required
              rows={5}
              placeholder="Explain your situation, what you learned, and why you should be given another chance..."
              className="w-full rounded-xl border border-slate-600 bg-slate-800/50 px-4 py-3 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
              value={formData.appeal}
              onChange={(e) => setFormData({ ...formData, appeal: e.target.value })}
            />
          </div>
          
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 py-3 font-bold text-slate-950 transition hover:from-cyan-300 hover:to-sky-400 hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Submit Appeal
          </button>
          
          <p className="text-center text-sm text-slate-400">
            Appeals are reviewed by staff. Please be patient and don&apos;t submit multiple appeals.
          </p>
        </form>
      </div>
    </main>
  );
}
