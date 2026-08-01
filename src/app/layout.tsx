import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Harbor Dashboard',
  description: 'Falix VM public status dashboard',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
