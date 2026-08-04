'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SeaBackground from '@/components/SeaBackground';
import { useServerStatus } from '@/components/ServerStatusContext';

interface StaffMember {
  name: string;
  role: string;
}

const staff: StaffMember[] = [
  { name: 'VideoHarbor2115', role: 'Owner' },
];

export default function Staff() {
  const { isOnline } = useServerStatus();
  const [onlinePlayers, setOnlinePlayers] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/server-info')
      .then(res => res.json())
      .then(data => {
        if (data.players) {
          setOnlinePlayers(data.players.map((p: { name: string }) => p.name));
        }
      })
      .catch(() => {});
  }, []);

  const isPlayerOnline = (name: string) => onlinePlayers.includes(name);

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 text-slate-100">
      <SeaBackground isOffline={!isOnline} />
      <Navbar />
      
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-white text-glow">Staff Team</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {staff.map((member) => (
            <div key={member.name} className="glass-card rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={`https://mc-heads.net/avatar/${member.name}/64`}
                    alt={member.name}
                    className="h-16 w-16 rounded-lg"
                  />
                  {isPlayerOnline(member.name) && (
                    <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-slate-800"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <span className="inline-flex items-center gap-1 text-sm text-cyan-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
                    {member.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {staff.length === 1 && (
          <p className="mt-6 text-center text-slate-400">
            We&apos;re always looking for new staff! Apply in our Discord.
          </p>
        )}
      </div>
    </main>
  );
}
