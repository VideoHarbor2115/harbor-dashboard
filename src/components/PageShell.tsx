'use client';

import Navbar from '@/components/Navbar';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 pt-8 pb-4 text-slate-100 flex flex-col">
      <div className="sea-bg pointer-events-none absolute inset-0 -z-10" />
      <Navbar />
      <div className="flex-1">{children}</div>
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
