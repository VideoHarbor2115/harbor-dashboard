'use client';

import { useEffect, useState } from 'react';

export default function DynamicFavicon({ isOnline }: { isOnline: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (favicon) {
      // Add status indicator to favicon title
      document.title = isOnline ? '🟢 HarborMC Dashboard' : '🔴 HarborMC Dashboard';
    }
  }, [isOnline]);

  if (!mounted) return null;

  return null;
}
