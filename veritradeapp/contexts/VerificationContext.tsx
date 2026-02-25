import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

interface Verification {
  id: string;
  businessName: string;
  registrationNumber: string;
  status: 'pending' | 'verified' | 'rejected' | 'flagged';
  submittedAt: Date;
  adminNotes?: string;
}

interface VerificationContextType {
  verifications: Verification[];
  addVerification: (verification: Omit<Verification, 'id' | 'submittedAt'>) => Verification;
  updateVerification: (id: string, updates: Partial<Verification>) => void;
  stats: {
    verified: number;
    pending: number;
    flagged: number;
  };
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export function VerificationProvider({ children }: { children: React.ReactNode }) {
  const [verifications, setVerifications] = useState<Verification[]>([]);

  const stats = useMemo(() => ({
    verified: verifications.filter(v => v.status === 'verified').length,
    pending: verifications.filter(v => v.status === 'pending').length,
    flagged: verifications.filter(v => v.status === 'flagged').length,
  }), [verifications]);

  const addVerification = (verification: Omit<Verification, 'id' | 'submittedAt'>) => {
    const newVerification: Verification = {
      ...verification,
      id: Date.now().toString(),
      submittedAt: new Date(),
    };
    setVerifications(prev => [newVerification, ...prev]);
    return newVerification;
  };

  const updateVerification = (id: string, updates: Partial<Verification>) => {
    setVerifications(prev =>
      prev.map(v => (v.id === id ? { ...v, ...updates } : v))
    );
  };

  return (
    <VerificationContext.Provider value={{ verifications, addVerification, updateVerification, stats }}>
      {children}
    </VerificationContext.Provider>
  );
}

export function useVerifications() {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerifications must be used within VerificationProvider');
  }
  return context;
}
