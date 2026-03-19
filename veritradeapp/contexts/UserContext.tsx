import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id?: string;
  name: string;
  email: string;
  company_name?: string;
  profile_image?: string;
  registration_number?: string;
  role?: string;
  verified_status?: 'verified' | 'pending' | 'unverified';
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (updates: Partial<User>) => void;
  clearUser: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const updateUser = (updates: Partial<User>) => {
    const updated = { ...user, ...updates } as User;
    setUser(updated);
  };

  const clearUser = () => {
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser, clearUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
