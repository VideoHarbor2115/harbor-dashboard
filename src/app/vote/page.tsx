import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Vote() {
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
          <Link href="/vote" className="text-cyan-300 transition hover:text-cyan-100">Vote</Link>
          <Link href="/social" className="text-slate-400 transition hover:text-cyan-300">Social</Link>
        </div>
      </nav>
      
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-white">Vote for HarborMC</h1>
        
        <div className="grid gap-4 md:grid-cols-2">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-2xl border border-cyan-400/30 bg-cyan-900/30 p-6 transition hover:bg-cyan-800/40"
          >
            <h2 className="text-xl font-semibold text-white">PlanetMinecraft</h2>
            <p className="mt-2 text-cyan-200">Vote for us on PMC</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-2xl border border-cyan-400/30 bg-cyan-900/30 p-6 transition hover:bg-cyan-800/40"
          >
            <h2 className="text-xl font-semibold text-white">TopG</h2>
            <p className="mt-2 text-cyan-200">Vote for us on TopG</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-2xl border border-cyan-400/30 bg-cyan-900/30 p-6 transition hover:bg-cyan-800/40"
          >
            <h2 className="text-xl font-semibold text-white">Minecraft Server List</h2>
            <p className="mt-2 text-cyan-200">Vote for us on MCSL</p>
          </a>
          
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rounded-2xl border border-cyan-400/30 bg-cyan-900/30 p-6 transition hover:bg-cyan-800/40"
          >
            <h2 className="text-xl font-semibold text-white">ServerPact</h2>
            <p className="mt-2 text-cyan-200">Vote for us on ServerPact</p>
          </a>
        </div>
        
        <p className="mt-8 text-center text-slate-400">
          Voting helps us grow! Thank you for your support.
        </p>
      </div>
    </main>
  );
}
