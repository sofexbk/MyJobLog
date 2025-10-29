import api from '@/app/lib/axios';
import { setToken, removeToken } from '@/app/lib/auth';
import { AuthRequest, AuthResponse } from '@/app/types';

export const authService = {
  async register(data: AuthRequest): Promise<string> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async login(data: AuthRequest): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    const { token } = response.data;
    setToken(token);
    return response.data;
  },

  logout() {
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  },
};