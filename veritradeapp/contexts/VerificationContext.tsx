import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Verification {
  id: string;
  businessName: string;
  registrationNumber: string;
  status: 'pending' | 'verified' | 'rejected' | 'flagged';
  submittedDate: string;
  reviewedDate?: string;
  cacData?: {
    supplier_id: string;
    business_type: string;
    industry_category: string;
    state: string;
    registration_date: string;
    verification_status: string;
    verification_reason: string;
  };
}

interface VerificationContextType {
  verifications: Verification[];
  addVerification: (verification: Omit<Verification, 'id' | 'submittedDate'>) => Verification;
  updateVerification: (id: string, updates: Partial<Verification>) => void;
  getVerificationById: (id: string) => Verification | undefined;
  getStats: () => { verified: number; pending: number; flagged: number };
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export const useVerifications = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerifications must be used within a VerificationProvider');
  }
  return context;
};

export const VerificationProvider = ({ children }: { children: ReactNode }) => {
  const [verifications, setVerifications] = useState<Verification[]>([
    // Mock initial data
    {
      id: 'VT-3343',
      businessName: 'Aliko Logistics Ltd',
      registrationNumber: 'RC856259',
      status: 'verified',
      submittedDate: '2026-02-20',
      reviewedDate: '2026-02-21',
      cacData: {
        supplier_id: 'BUS0000001',
        business_type: 'Limited Liability Company',
        industry_category: 'Logistics',
        state: 'Lagos',
        registration_date: '2019-09-02',
        verification_status: 'VERIFIED',
        verification_reason: 'Business passed basic verification'
      }
    },
    {
      id: 'VT-3342',
      businessName: 'Glow Beauty & Spa',
      registrationNumber: 'BN-112233',
      status: 'pending',
      submittedDate: '2026-02-19',
    }
  ]);

  const addVerification = (verification: Omit<Verification, 'id' | 'submittedDate'>) => {
    const newVerification: Verification = {
      ...verification,
      id: `VT-${Math.floor(1000 + Math.random() * 9000)}`,
      submittedDate: new Date().toISOString().split('T')[0],
    };
    
    setVerifications(prev => [newVerification, ...prev]);
    return newVerification;
  };

  const updateVerification = (id: string, updates: Partial<Verification>) => {
    setVerifications(prev =>
      prev.map(v => v.id === id ? { ...v, ...updates } : v)
    );
  };

  const getVerificationById = (id: string) => {
    return verifications.find(v => v.id === id);
  };

  const getStats = () => {
    return {
      verified: verifications.filter(v => v.status === 'verified').length,
      pending: verifications.filter(v => v.status === 'pending').length,
      flagged: verifications.filter(v => v.status === 'flagged').length,
    };
  };

  return (
    <VerificationContext.Provider
      value={{
        verifications,
        addVerification,
        updateVerification,
        getVerificationById,
        getStats,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};
