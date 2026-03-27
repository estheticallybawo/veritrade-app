const API_BASE_URL = 'https://veritradebackend.onrender.com/api';

interface ApiResponse<T = any> {
  verifications: boolean;
  id: string;
  data?: T;
  error?: string;
  status: number;
}

class ApiService {
  private token: string | null = null;

  // Set auth token
  setToken(token: string) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  clearToken() {
    this.token = null;
  }

  // Base request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    requiresAuth: boolean = true
  ): Promise<ApiResponse<T>> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      };

      if (requiresAuth) {
        const token = this.getToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      return {
        verifications: response.ok,
        id: Math.random().toString(36).substr(2, 9),
        data,
        status: response.status,
        error: response.ok ? undefined : data.message || 'Request failed',
      };
    } catch (error) {
      return {
        verifications: false,
        id: Math.random().toString(36).substr(2, 9),
        error: error instanceof Error ? error.message : 'Network error',
        status: 500,
      };
    }
  }

  // HTTP methods
  async get<T>(endpoint: string, requiresAuth: boolean = true) {
    return this.request<T>(endpoint, { method: 'GET' }, requiresAuth);
  }

  async post<T>(endpoint: string, body: any, requiresAuth: boolean = true) {
    console.log('API POST:', endpoint, body);
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
      requiresAuth
    );
  }

  async patch<T>(endpoint: string, body: any, requiresAuth: boolean = true) {
    return this.request<T>(
      endpoint,
      {
        method: 'PATCH',
        body: JSON.stringify(body),
      },
      requiresAuth
    );
  }

  async delete<T>(endpoint: string, requiresAuth: boolean = true) {
    return this.request<T>(endpoint, { method: 'DELETE' }, requiresAuth);
  }
}

export const api = new ApiService();