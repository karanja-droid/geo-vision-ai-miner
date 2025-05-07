
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ConnectivityContextType {
  isOnline: boolean;
  lastOnlineTime: Date | null;
}

const ConnectivityContext = createContext<ConnectivityContextType>({
  isOnline: true,
  lastOnlineTime: new Date(),
});

export const useConnectivity = () => useContext(ConnectivityContext);

interface ConnectivityProviderProps {
  children: ReactNode;
}

export const ConnectivityProvider: React.FC<ConnectivityProviderProps> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [lastOnlineTime, setLastOnlineTime] = useState<Date | null>(
    navigator.onLine ? new Date() : null
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setLastOnlineTime(new Date());
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ConnectivityContext.Provider value={{ isOnline, lastOnlineTime }}>
      {children}
    </ConnectivityContext.Provider>
  );
};
