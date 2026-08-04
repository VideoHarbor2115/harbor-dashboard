'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SeaBackground from '@/components/SeaBackground';
import { useServerStatus } from '@/components/ServerStatusContext';

interface DiscordWidget {
  presence_count: number;
  instant_invite: string | null;
  members: {
    nick: string | null;
    avatar: string | null;
    status: string;
    game: { name: string } | null;
    roles: string[];
  }[];
}

export default function Social() {
  const { isOnline } = useServerStatus();
  const [widget, setWidget] = useState<DiscordWidget | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Discord widget data
    fetch('https://discord.com/api/guilds/juNs35nM5z/widget.json')
      .then(res => res.json())
      .then(data => {
        setWidget(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      <SeaBackground isOffline={!isOnline} />
      <Navbar />
      
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-white text-glow">Follow Us</h1>
        
        {/* Discord Widget */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <svg className="h-6 w-6 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Discord Community
            </h2>
            {widget && (
              <span className="flex items-center gap-2 text-sm text-green-400">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                {widget.presence_count} online
              </span>
            )}
          </div>
          
          {loading ? (
            <p className="text-slate-400">Loading Discord data...</p>
          ) : widget?.instant_invite ? (
            <a 
              href={widget.instant_invite}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl bg-indigo-600/20 border border-indigo-500/30 p-4 hover:bg-indigo-600/30 transition"
            >
              <span className="text-indigo-300 group-hover:text-indigo-200">Click to Join</span>
              <span className="text-2xl">→</span>
            </a>
          ) : (
            <a 
              href="https://discord.gg/juNs35nM5z"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl bg-indigo-600/20 border border-indigo-500/30 p-4 hover:bg-indigo-600/30 transition"
            >
              <span className="text-indigo-300 group-hover:text-indigo-200">Join Server</span>
              <span className="text-2xl">→</span>
            </a>
          )}
          
          {/* Online Members */}
          {widget && widget.members && widget.members.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-slate-400 mb-2">Online Members</p>
              <div className="flex flex-wrap gap-2">
                {widget.members.slice(0, 20).map((member, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-1.5"
                  >
                    <div className="relative">
                      <div className="h-6 w-6 rounded-full bg-slate-600 flex items-center justify-center text-xs">
                        {member.nick?.[0] || '?'}
                      </div>
                      <span className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-800 ${
                        member.status === 'online' ? 'bg-green-400' : 
                        member.status === 'idle' ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></span>
                    </div>
                    <span className="text-sm text-slate-300">{member.nick || 'Unknown'}</span>
                  </div>
                ))}
                {widget.members.length > 20 && (
                  <div className="flex items-center rounded-lg bg-slate-800/50 px-3 py-1.5 text-sm text-slate-400">
                    +{widget.members.length - 20} more
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Other Social Links */}
        <div className="grid gap-4 md:grid-cols-2">
          <a 
            href="https://discord.gg/juNs35nM5z" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group glass-card rounded-2xl p-6 hover:border-indigo-400/50 transition"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-indigo-600/20 p-3">
                <svg className="h-8 w-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-indigo-300">Discord</h3>
                <p className="text-sm text-slate-400">Chat & community</p>
              </div>
            </div>
          </a>
          
          <div className="glass-card rounded-2xl p-6 opacity-50">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-slate-700/20 p-3">
                <svg className="h-8 w-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.18c5.4 0 9.82 4.42 9.82 9.82s-4.42 9.82-9.82 9.82S2.18 17.4 2.18 12 6.6 2.18 12 2.18z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">YouTube</h3>
                <p className="text-sm text-slate-400">Coming soon</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6 opacity-50">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-slate-700/20 p-3">
                <svg className="h-8 w-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.18c5.4 0 9.82 4.42 9.82 9.82s-4.42 9.82-9.82 9.82S2.18 17.4 2.18 12 6.6 2.18 12 2.18z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Twitter/X</h3>
                <p className="text-sm text-slate-400">Coming soon</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6 opacity-50">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-slate-700/20 p-3">
                <svg className="h-8 w-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.18c5.4 0 9.82 4.42 9.82 9.82s-4.42 9.82-9.82 9.82S2.18 17.4 2.18 12 6.6 2.18 12 2.18z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white">Instagram</h3>
                <p className="text-sm text-slate-400">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 
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
