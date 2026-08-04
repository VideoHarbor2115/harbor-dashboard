import type { Metadata } from 'next';
import './globals.css';
import { ServerStatusProvider } from '@/components/ServerStatusContext';

export const metadata: Metadata = {
  title: 'HarborMC Dashboard',
  description: 'HarborMC — A community-focused Minecraft survival server. Live status, players, and more.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ServerStatusProvider>
          {children}
        </ServerStatusProvider>
      </body>
    </html>
  );
}
