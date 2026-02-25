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
  admin_notes?: string;
}

export interface AdminAction {
  admin_notes?: string;
}

export const verificationService = {
  // Submit new verification request
  async submit(request: VerificationRequest) {
    return api.post<VerificationResponse>('/verifications/submit', request);
  },

  // Get user's verification requests
  async getMyRequests() {
    return api.get<VerificationResponse[]>('/verifications/my-requests');
  },

  // Get single verification by ID
  async getById(id: number | string) {
    return api.get<VerificationResponse>(`/verifications/${id}`);
  },

  // Cancel verification request (buyer only)
  async cancel(id: number | string) {
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