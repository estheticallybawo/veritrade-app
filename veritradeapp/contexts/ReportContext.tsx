import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BusinessReport, reportService } from '../services/report';

interface ReportContextType {
  reports: BusinessReport[];
  isLoading: boolean;
  submitReport: (report: BusinessReport) => Promise<BusinessReport>;
  loadReports: () => Promise<void>;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<BusinessReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const submitReport = async (report: BusinessReport): Promise<BusinessReport> => {
    setIsLoading(true);
    try {
      const result = await reportService.submitReport(report);
      setReports([...reports, result]);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const loadReports = async () => {
    setIsLoading(true);
    try {
      const fetchedReports = await reportService.getMyReports();
      setReports(fetchedReports);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ReportContext.Provider value={{ reports, isLoading, submitReport, loadReports }}>
      {children}
    </ReportContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReports must be used within ReportProvider');
  }
  return context;
}
