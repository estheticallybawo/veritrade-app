import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { verificationService } from '../services/verification';
import { useUser } from './UserContext';

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
  refreshVerifications: () => Promise<void>;
  stats: {
    verified: number;
    pending: number;
    flagged: number;
  };
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

export function VerificationProvider({ children }: { children: React.ReactNode }) {
  const [verifications, setVerifications] = useState<Verification[]>([]);
  const { user } = useUser();

  const stats = useMemo(() => ({
    verified: verifications.filter(v => v.status === 'verified').length,
    pending: verifications.filter(v => v.status === 'pending').length,
    flagged: verifications.filter(v => v.status === 'flagged').length,
  }), [verifications]);

  const refreshVerifications = async () => {
    try {
      const response = await verificationService.getMyRequests();
      const verificationArray = Array.isArray(response) ? response : [];
      setVerifications(verificationArray.map((v: any) => ({
        id: String(v.id),
        businessName: v.business_name,
        registrationNumber: v.registration_number,
        status: v.status,
        submittedAt: new Date(v.submitted_at || v.createdAt),
        adminNotes: v.admin_notes
      })));
    } catch (error) {
      console.error('Failed to refresh verifications:', error);
      setVerifications([]);
    }
  };

  // Load verifications when user changes
  useEffect(() => {
    if (user) {
      refreshVerifications();
    } else {
      setVerifications([]);
    }
  }, [user?.email]);

  return (
    <VerificationContext.Provider value={{ verifications, refreshVerifications, stats }}>
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
