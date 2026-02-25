import { api } from './api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: 'buyer' | 'admin';
  };
}

export const authService = {
  // Register new user
  async register(data: RegisterData) {
    const response = await api.post<AuthResponse>('/auth/register', data, false);
    
    if (response.data?.token) {
      api.setToken(response.data.token);
    }
    
    return response;
  },

  // Login user
  async login(credentials: LoginCredentials) {
    const response = await api.post<AuthResponse>('/auth/login', credentials, false);
    
    if (response.data?.token) {
      api.setToken(response.data.token);
    }
    
    return response;
  },

  // Logout
  async logout() {
    await api.clearToken();
  },

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const token = await api.getToken();
    return !!token;
  },
};