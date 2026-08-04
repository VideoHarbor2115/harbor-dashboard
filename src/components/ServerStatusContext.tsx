'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface ServerStatusContextType {
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
}

const ServerStatusContext = createContext<ServerStatusContextType>({
  isOnline: true,
  setIsOnline: () => {},
});

export function useServerStatus() {
  return useContext(ServerStatusContext);
}

export function ServerStatusProvider({ children, initialOnline = true }: { children: React.ReactNode; initialOnline?: boolean }) {
  const [isOnline, setIsOnline] = useState(initialOnline);

  return (
    <ServerStatusContext.Provider value={{ isOnline, setIsOnline }}>
      {children}
    </ServerStatusContext.Provider>
  );
}
