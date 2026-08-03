'use client';

import Link from 'next/link';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mt-10 mb-4 text-2xl font-bold text-cyan-300 border-b border-cyan-400/20 pb-2">{children}</h2>
);

const SubSection = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div className="mt-6">
    <h3 className="mb-3 text-lg font-semibold text-white">{emoji} {title}</h3>
    <div className="space-y-1 text-sm text-slate-300 ml-7">{children}</div>
  </div>
);

export default function Rules() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      {/* Sea background */}
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

      <div className="mx-auto max-w-3xl rounded-3xl border border-cyan-400/30 bg-cyan-950/50 p-8 shadow-2xl shadow-cyan-900/30 backdrop-blur">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">⚓ HarborMC | Captain&apos;s Code</h1>
          <p className="mt-3 text-lg italic text-cyan-200">&ldquo;Respect the crew, respect the voyage.&rdquo;</p>
          <p className="mt-4 text-sm text-slate-300">
            Welcome to <strong>HarborMC!</strong> These rules help keep our community fun, fair, and welcoming.
            Not every situation can be covered by written rules, so staff moderate <strong>case-by-case</strong>.
            Use common sense, respect others, and help make HarborMC a place everyone can enjoy.
          </p>
        </div>

        {/* Discord Rules */}
        <SectionTitle>💬 Discord Rules</SectionTitle>

        <SubSection emoji="🤝" title="Respect Everyone">
          <p>Treat all members with respect. Harassment, discrimination, bullying, excessive toxicity, or intentionally creating drama is not allowed.</p>
        </SubSection>

        <SubSection emoji="💬" title="Keep It Appropriate">
          <p>Mild swearing is fine. NSFW content, hate speech, offensive content, or anything intended to make others uncomfortable is prohibited.</p>
        </SubSection>

        <SubSection emoji="📚" title="Stay Organized">
          <p>Use the correct channels and forums, keep discussions on topic, and avoid spam or excessive pinging.</p>
        </SubSection>

        <SubSection emoji="🎙️" title="Voice Chat">
          <p>Don&apos;t yell, spam sounds, or intentionally disrupt conversations. Music and soundboards may only be used if everyone in the channel agrees.</p>
        </SubSection>

        <SubSection emoji="📢" title="No Advertising">
          <p>Advertising other servers, communities, or services without staff approval is not allowed.</p>
        </SubSection>

        <SubSection emoji="👮" title="Respect Staff">
          <p>If you disagree with a decision, discuss it calmly through the proper channels. Don&apos;t falsely claim you&apos;ve cheated or broken rules as a joke.</p>
        </SubSection>

        {/* Minecraft Rules */}
        <SectionTitle>⛏️ Minecraft Rules</SectionTitle>

        <SubSection emoji="🏠" title="Respect Players &amp; Builds">
          <p>No griefing, stealing, or intentionally damaging another player&apos;s property.</p>
        </SubSection>

        <SubSection emoji="⚔️" title="PvP">
          <p>PvP is only allowed if <strong>everyone involved agrees</strong>.</p>
        </SubSection>

        <SubSection emoji="🏗️" title="Building">
          <p>Don&apos;t build too close to other players without permission. Towns may create additional local rules, but they cannot override HarborMC&apos;s rules.</p>
        </SubSection>

        <SubSection emoji="🎭" title="Pranks">
          <p>Pranks are allowed if they are harmless, temporary, and easy to undo. If someone asks you to stop, respect their request.</p>
        </SubSection>

        <SubSection emoji="🐞" title="Bugs &amp; Exploits">
          <p>Do not intentionally abuse bugs, glitches, dupes, or exploits. Report them to staff instead.</p>
        </SubSection>

        <SubSection emoji="🌾" title="Farms &amp; Performance">
          <p>Automation is allowed provided it doesn&apos;t create excessive lag or negatively affect the server or economy. Staff may ask you to optimize, relocate, or remove problematic builds or farms.</p>
        </SubSection>

        <SubSection emoji="💰" title="Trading &amp; Alt Accounts">
          <p>Trading is encouraged. Scams are handled on a case-by-case basis by staff. Alt accounts are only allowed for approved or legitimate testing.</p>
        </SubSection>

        <SubSection emoji="🏚️" title="Abandoned Builds">
          <p>Do not loot, claim, or modify abandoned builds without staff approval. Staff determine when a build is considered abandoned.</p>
        </SubSection>

        {/* Community Conduct */}
        <SectionTitle>⚖️ Community Conduct</SectionTitle>

        <ul className="space-y-2 text-sm text-slate-300 ml-7 list-disc list-inside">
          <li>Help create a welcoming community.</li>
          <li>Keep disagreements civil.</li>
          <li>Avoid unnecessary drama.</li>
          <li>Respect other players&apos; time and effort.</li>
          <li>Use common sense in situations not specifically covered by the rules.</li>
        </ul>

        {/* Reports & Appeals */}
        <SectionTitle>📝 Reports &amp; Appeals</SectionTitle>

        <p className="text-sm text-slate-300">Screenshots or recordings are encouraged when reporting rule violations.</p>
        <p className="mt-1 text-sm text-slate-300">False or intentionally misleading reports may result in moderation.</p>
        <p className="mt-1 text-sm text-slate-300">If you believe a punishment was issued in error, you&apos;re welcome to submit an appeal.</p>

        {/* Staff Discretion */}
        <SectionTitle>⚓ Staff Discretion</SectionTitle>

        <p className="text-sm text-slate-300">
          HarborMC staff reserve the right to make reasonable decisions in situations not explicitly covered by
          these rules in order to keep the server fair, balanced, and enjoyable.
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Punishments may include reminders, warnings, mutes, temporary bans, or permanent bans depending on
          the severity and circumstances of the violation.
        </p>

        {/* Rule Updates */}
        <SectionTitle>📖 Rule Updates</SectionTitle>

        <p className="text-sm text-slate-300">
          These rules may change over time as HarborMC grows. Please check back periodically for updates.
        </p>
        <p className="mt-1 text-sm text-slate-300">
          If you&apos;re ever unsure about a rule, ask a moderator in the <strong>Harbor Station (Rule Help)</strong> forum before acting.
        </p>

        {/* Footer */}
        <div className="mt-10 border-t border-cyan-400/20 pt-6 text-center">
          <p className="text-lg font-semibold text-cyan-200">Fair winds and following seas, sailor! ⚓</p>
          <p className="mt-2 text-xs text-slate-500">
            Rules generated with assistance from ChatGPT and reviewed by the HarborMC staff team.
          </p>
        </div>
      </div>
    </main>
  );
}
