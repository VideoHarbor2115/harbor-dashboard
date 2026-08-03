import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Social() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      {/* Sea background animations */}
      <div className="sea-bg pointer-events-none absolute inset-0 -z-10" />
      
      {/* Navigation */}
      <nav className="mb-8 flex items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-950/40 px-6 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="HarborMC" className="h-8 w-8 rounded-lg" />
          <span className="text-lg font-bold text-white">HarborMC</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-slate-400 transition hover:text-cyan-300">Status</Link>
          <Link href="/players" className="text-slate-400 transition hover:text-cyan-300">Players</Link>
          <Link href="/rules" className="text-slate-400 transition hover:text-cyan-300">Rules</Link>
          <Link href="/vote" className="text-slate-400 transition hover:text-cyan-300">Vote</Link>
          <Link href="/social" className="text-cyan-300 transition hover:text-cyan-100">Social</Link>
        </div>
      </nav>
      
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-white">Follow Us</h1>
        
        <div className="grid gap-4 md:grid-cols-2">
          <a 
            href="https://discord.gg/juNs35nM5z" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-2xl border border-indigo-400/30 bg-indigo-900/30 p-6 transition hover:bg-indigo-800/40"
          >
            <h2 className="text-xl font-semibold text-white">Discord</h2>
            <p className="mt-2 text-indigo-200">Join our community</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-2xl border border-red-400/30 bg-red-900/30 p-6 transition hover:bg-red-800/40"
          >
            <h2 className="text-xl font-semibold text-white">YouTube</h2>
            <p className="mt-2 text-red-200">Subscribe to our channel</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-2xl border border-sky-400/30 bg-sky-900/30 p-6 transition hover:bg-sky-800/40"
          >
            <h2 className="text-xl font-semibold text-white">Twitter / X</h2>
            <p className="mt-2 text-sky-200">Follow us for updates</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-2xl border border-pink-400/30 bg-pink-900/30 p-6 transition hover:bg-pink-800/40"
          >
            <h2 className="text-xl font-semibold text-white">Instagram</h2>
            <p className="mt-2 text-pink-200">See our latest posts</p>
          </a>
        </div>
      </div>
    </main>
  );
}
