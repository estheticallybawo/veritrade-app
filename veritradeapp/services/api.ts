import AsyncStorage from '@react-native-async-storage/async-storage';

// Change this based on environment
const API_BASE_URL = "https://veritrade-production.up.railway.app";

interface ApiResponse<T = any> {
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
    AsyncStorage.setItem('auth_token', token);
  }

  async getToken(): Promise<string | null> {
    if (this.token) return this.token;
    const stored = await AsyncStorage.getItem('auth_token');
    this.token = stored;
    return stored;
  }

  async clearToken() {
    this.token = null;
    await AsyncStorage.removeItem('auth_token');
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
        const token = await this.getToken();
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
        id: Math.random().toString(36).substr(2, 9),
        data,
        status: response.status,
        error: response.ok ? undefined : data.message || 'Request failed',
      };
    } catch (error) {
      return {
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
