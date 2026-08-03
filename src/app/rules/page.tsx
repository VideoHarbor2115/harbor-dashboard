'use client';

import Link from 'next/link';

export default function Rules() {
  const rules = [
    {
      title: "Respect Others",
      description: "Treat all players with respect. No harassment, discrimination, or hateful speech.",
      icon: "🤝"
    },
    {
      title: "No Griefing",
      description: "Do not destroy or steal from other players' builds without permission.",
      icon: "🏠"
    },
    {
      title: "No Cheating",
      description: "No hacks, exploits, or modified clients that give unfair advantages.",
      icon: "🎮"
    },
    {
      title: "Keep It Clean",
      description: "No excessive swearing, spam, or inappropriate builds/chat.",
      icon: "✨"
    },
    {
      title: "Follow Discord Rules",
      description: "Abide by Discord community guidelines in our server as well.",
      icon: "💬"
    },
    {
      title: "Have Fun!",
      description: "Enjoy your time at HarborMC and make new friends.",
      icon: "⚓"
    }
  ];

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
          <Link href="/rules" className="text-cyan-300 transition hover:text-cyan-100">Rules</Link>
          <Link href="/vote" className="text-slate-400 transition hover:text-cyan-300">Vote</Link>
          <Link href="/social" className="text-slate-400 transition hover:text-cyan-300">Social</Link>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Harbor Dashboard</p>
          <h1 className="mt-2 text-4xl font-bold text-white">Server Rules</h1>
          <p className="mt-2 text-slate-300">Please follow these rules to keep HarborMC a great place for everyone</p>
        </div>

        <div className="grid gap-4">
          {rules.map((rule, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl border border-cyan-400/20 bg-cyan-950/50 p-5 backdrop-blur"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-2xl">
                {rule.icon}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">{rule.title}</h2>
                <p className="mt-1 text-sm text-slate-300">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-amber-400/30 bg-amber-900/20 p-5">
          <p className="text-center text-sm text-amber-200">
            ⚠️ Violating these rules may result in warnings, kicks, or bans at moderator discretion.
          </p>
        </div>
      </div>
    </main>
  );
}
