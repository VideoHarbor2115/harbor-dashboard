'use client';

import Navbar from '@/components/Navbar';
import SeaBackground from '@/components/SeaBackground';
import { useServerStatus } from '@/components/ServerStatusContext';

interface StaffMember {
  name: string;
  role: string;
  avatar?: string;
}

const staff: StaffMember[] = [
  { name: 'VideoHarbor2115', role: 'Owner' },
];

export default function Staff() {
  const { isOnline } = useServerStatus();

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
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
                  {member.name[0].toUpperCase()}
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
