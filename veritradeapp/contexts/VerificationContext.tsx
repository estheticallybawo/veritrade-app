import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  isLoading: boolean;
}

const VerificationContext = createContext<VerificationContextType | undefined>(undefined);

const STORAGE_KEY = '@veritrade_verifications';
const MOCK_INITIAL_DATA: Verification[] = [
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
    businessName: 'Tech Solutions Inc',
    registrationNumber: 'RC742053',
    status: 'pending',
    submittedDate: '2026-02-23',
  }
];

export const useVerifications = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    throw new Error('useVerifications must be used within a VerificationProvider');
  }
  return context;
};

export const VerificationProvider = ({ children }: { children: ReactNode }) => {
  const [verifications, setVerifications] = useState<Verification[]>(MOCK_INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadVerifications = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setVerifications(JSON.parse(stored));
        } else {
          // First time - save mock data
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_INITIAL_DATA));
        }
      } catch (error) {
        console.error('Failed to load verifications:', error);
        setVerifications(MOCK_INITIAL_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    loadVerifications();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      const saveVerifications = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(verifications));
        } catch (error) {
          console.error('Failed to save verifications:', error);
        }
      };

      saveVerifications();
    }
  }, [verifications, isLoading]);

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
        isLoading,
      }}
    >
      {children}
    </VerificationContext.Provider>
  );
};
