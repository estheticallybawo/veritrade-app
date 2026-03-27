import { api } from './api';

export interface VerificationRequest {
  business_name: string;
  registration_number: string;
}

export interface VerificationResponse {
  id: number;
  business_name: string;
  registration_number: string;
  status: 'pending' | 'verified' | 'rejected' | 'flagged' | 'cancelled';
  submitted_at: string;
  createdAt?: string;
  admin_notes?: string;
}

export interface AdminAction {
  admin_notes?: string;
}

const USE_MOCK_VERIFICATIONS = true;

// In-memory storage per user (keyed by user email)
const userMockData = new Map<string, VerificationResponse[]>();

const DEFAULT_MOCK_VERIFICATIONS: VerificationResponse[] = [
  {
    id: 1,
    business_name: 'Alpha Traders Ltd',
    registration_number: 'RC-123456',
    status: 'verified',
    submitted_at: '2026-02-20T10:15:00.000Z',
    createdAt: '2026-02-20T10:15:00.000Z',
    admin_notes: 'Matched CAC records.'
  },
  {
    id: 2,
    business_name: 'Nova Supplies',
    registration_number: 'RC-654321',
    status: 'pending',
    submitted_at: '2026-02-22T08:30:00.000Z',
    createdAt: '2026-02-22T08:30:00.000Z'
  },
  {
    id: 3,
    business_name: 'Orion Exporters',
    registration_number: 'RC-777777',
    status: 'rejected',
    submitted_at: '2026-02-23T14:05:00.000Z',
    createdAt: '2026-02-23T14:05:00.000Z',
    admin_notes: 'Registration number not found.'
  }
];

// Helper to get current user's email
let currentUserEmail: string | null = null;

export const setCurrentUserEmail = (email: string | null) => {
  currentUserEmail = email;
};

const getMockVerifications = (): VerificationResponse[] => {
  if (!currentUserEmail) return [];
  
  if (!userMockData.has(currentUserEmail)) {
    // Clone default data for new user
    userMockData.set(currentUserEmail, JSON.parse(JSON.stringify(DEFAULT_MOCK_VERIFICATIONS)));
  }
  
  return userMockData.get(currentUserEmail) || [];
};

const saveMockVerifications = (items: VerificationResponse[]) => {
  if (!currentUserEmail) return;
  userMockData.set(currentUserEmail, items);
};

const nextMockId = (items: VerificationResponse[]) => {
  const maxId = items.reduce((max, item) => Math.max(max, item.id), 0);
  return maxId + 1;
};

export const verificationService = {
  // Submit new verification request
  async submit(request: VerificationRequest) {
    // Not logging request details for security (contains business info)
    if (USE_MOCK_VERIFICATIONS) {
      const items = getMockVerifications();
      const now = new Date().toISOString();
      const newItem: VerificationResponse = {
        id: nextMockId(items),
        business_name: request.business_name,
        registration_number: request.registration_number,
        status: 'pending',
        submitted_at: now,
        createdAt: now
      };
      items.unshift(newItem);
      saveMockVerifications(items);
      return newItem;
    }
    return api.post<VerificationResponse>('/verifications/submit', request);
  },

  // Get user's verification requests
  async getMyRequests() {
    if (USE_MOCK_VERIFICATIONS) {
      return getMockVerifications();
    }
    return api.get<VerificationResponse[]>('/verifications/my-requests');
  },

  // Get single verification by ID
  async getById(id: number | string) {
    if (USE_MOCK_VERIFICATIONS) {
      const items = getMockVerifications();
      return items.find(item => item.id === Number(id)) || null;
    }
    return api.get<VerificationResponse>(`/verifications/${id}`);
  },

  // Cancel verification request (buyer only)
  async cancel(id: number | string) {
    if (USE_MOCK_VERIFICATIONS) {
      const items = getMockVerifications();
      const target = items.find(item => item.id === Number(id));
      if (target) {
        target.status = 'cancelled';
        saveMockVerifications(items);
      }
      return target || null;
    }
    return api.patch<VerificationResponse>(`/verifications/${id}/cancel`, {});
  },

  // Admin: Get pending verifications
  async getPending() {
    return api.get<VerificationResponse[]>('/admin/verifications/pending');
  },

  // Admin: Get verifications by status
  async getByStatus(status: string) {
    return api.get<VerificationResponse[]>(`/admin/verifications?status=${status}`);
  },

  // Admin: Verify a request
  async verify(id: number | string, notes?: string) {
    return api.patch<VerificationResponse>(
      `/admin/verifications/${id}/verify`,
      { admin_notes: notes }
    );
  },

  // Admin: Reject a request
  async reject(id: number | string, notes?: string) {
    return api.patch<VerificationResponse>(
      `/admin/verifications/${id}/reject`,
      { admin_notes: notes }
    );
  },

  // Admin: Flag a request
  async flag(id: number | string, notes?: string) {
    return api.patch<VerificationResponse>(
      `/admin/verifications/${id}/flag`,
      { admin_notes: notes }
    );
  },
};