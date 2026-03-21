import { api } from './api';

export type ReportCategory = 
  | 'fraud'
  | 'incorrect_info'
  | 'inactive'
  | 'unresponsive'
  | 'poor_quality'
  | 'other';

export interface BusinessReport {
  id?: number;
  business_name: string;
  registration_number?: string;
  category: ReportCategory;
  additional_categories?: ReportCategory[];
  description: string;
  submitted_at?: string;
  status?: 'submitted' | 'reviewed' | 'resolved';
}

const USE_MOCK_REPORTS = true;

// In-memory storage per user (keyed by user email)
const userReports = new Map<string, BusinessReport[]>();

// Helper to get current user's email
let currentUserEmail: string | null = null;

export const setCurrentUserEmailForReports = (email: string | null) => {
  currentUserEmail = email;
};

const getMockReports = (): BusinessReport[] => {
  if (!currentUserEmail) return [];
  
  if (!userReports.has(currentUserEmail)) {
    userReports.set(currentUserEmail, []);
  }
  
  return userReports.get(currentUserEmail) || [];
};

const saveMockReports = (items: BusinessReport[]) => {
  if (!currentUserEmail) return;
  userReports.set(currentUserEmail, items);
};

const nextMockId = (items: BusinessReport[]) => {
  const maxId = items.reduce((max, item) => Math.max(max, item.id || 0), 0);
  return maxId + 5;
};

class ReportService {
  async submitReport(report: BusinessReport): Promise<BusinessReport> {
    if (USE_MOCK_REPORTS) {
      // Mock implementation
      const mockReports = getMockReports();
      const newReport: BusinessReport = {
        ...report,
        id: nextMockId(mockReports),
        submitted_at: new Date().toISOString(),
        status: 'submitted'
      };
      
      mockReports.push(newReport);
      saveMockReports(mockReports);
      
      console.log('Mock report submitted:', newReport);
      return newReport;
    }

    try {
      const response = await api.post<BusinessReport>('/reports', {
        business_name: report.business_name,
        registration_number: report.registration_number || '',
        category: report.category,
        additional_categories: report.additional_categories || [],
        description: report.description,
      }, true);

      if (response.data) {
        return response.data;
      } else {
        throw new Error(response.error || 'Failed to submit report');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      throw error;
    }
  }

  async getMyReports(): Promise<BusinessReport[]> {
    if (USE_MOCK_REPORTS) {
      // Mock implementation
      return getMockReports();
    }

    try {
      const response = await api.get<BusinessReport[]>('/reports/my-reports', true);
      
      if (Array.isArray(response.data)) {
        return response.data;
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching reports:', error);
      return [];
    }
  }
}

export const reportService = new ReportService();
