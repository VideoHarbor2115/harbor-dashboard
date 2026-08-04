'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

type NavGroup = {
  label: string;
  items: { href: string; label: string; icon: string }[];
};

const navGroups: NavGroup[] = [
  {
    label: 'Server',
    items: [
      { href: '/', label: 'Status', icon: '📡' },
      { href: '/players', label: 'Players', icon: '👥' },
      { href: '/staff', label: 'Staff', icon: '⭐' },
    ],
  },
  {
    label: 'Community',
    items: [
      { href: '/rules', label: 'Rules', icon: '📜' },
      { href: '/vote', label: 'Vote', icon: '🗳️' },
      { href: '/news', label: 'News', icon: '📰' },
      { href: '/gallery', label: 'Gallery', icon: '📸' },
      { href: '/social', label: 'Social', icon: '🌐' },
      { href: '/contact', label: 'Contact', icon: '📧' },
      { href: '/ban-appeal', label: 'Appeal', icon: '⚖️' },
      { href: '/extras', label: 'Extras', icon: '✨' },
    ],
  },
];

const allLinks = navGroups.flatMap((g) => g.items);

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav className="glass-card relative z-50 mb-8 flex items-center justify-between rounded-2xl px-5 py-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
          <img
            src="/logo.png"
            alt="HarborMC"
            className="h-8 w-8 rounded-lg transition group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/30"
          />
          <span className="text-lg font-bold text-white group-hover:text-cyan-200 transition">
            HarborMC
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navGroups.map((group, gi) => (
            <div key={group.label} className="flex items-center gap-1">
              {gi > 0 && (
                <div className="mx-2 h-5 w-px bg-cyan-400/20" />
              )}
              {group.items.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-cyan-500/20 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                      : 'text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/50'
                  }`}
                >
                  <span className="text-xs">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative z-50 flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 rounded-full bg-cyan-300 transition-all ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 rounded-full bg-cyan-300 transition-all ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-6 rounded-full bg-cyan-300 transition-all ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile slide-out panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-72 transform bg-cyan-950/95 backdrop-blur-xl border-l border-cyan-400/20 shadow-2xl shadow-cyan-900/50 transition-transform duration-300 md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col gap-2 p-6 pt-20">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-3">
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400/60">
                {group.label}
              </p>
              {group.items.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-base font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/30'
                      : 'text-slate-300 hover:text-cyan-200 hover:bg-cyan-950/60 border border-transparent'
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          ))}

          {/* Footer inside mobile menu */}
          <div className="mt-auto pt-6 border-t border-cyan-400/20">
            <p className="text-center text-xs text-slate-500">
              ⚓ Fair winds &amp; following seas
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
