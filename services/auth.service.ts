import api from '@/lib/api/axios';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '@/types/user.types';
import { ApiResponse } from '@/types/api.types';
import Cookies from 'js-cookie';
import { COOKIE_TOKEN_KEY, COOKIE_REFRESH_TOKEN_KEY } from '@/lib/utils/constants';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    
    // Simpan tokens ke cookies
    if (response.data.success) {
      Cookies.set(COOKIE_TOKEN_KEY, response.data.data.accessToken, { expires: 7 });
      Cookies.set(COOKIE_REFRESH_TOKEN_KEY, response.data.data.refreshToken, { expires: 30 });
    }
    
    return response.data;
  }

  async register(data: RegisterRequest): Promise<ApiResponse<User>> {
    const response = await api.post<ApiResponse<User>>('/auth/register', data);
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      // Hapus tokens dari cookies
      Cookies.remove(COOKIE_TOKEN_KEY);
      Cookies.remove(COOKIE_REFRESH_TOKEN_KEY);
    }
  }

  async getProfile(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/profile');
    return response.data.data;
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    const response = await api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>(
      '/auth/refresh',
      { refreshToken }
    );
    
    // Update token di cookies
    Cookies.set(COOKIE_TOKEN_KEY, response.data.data.accessToken, { expires: 7 });
    
    return { accessToken: response.data.data.accessToken };
  }

  async validateToken(): Promise<boolean> {
    try {
      const response = await api.get<ApiResponse<{ valid: boolean }>>('/auth/validate');
      return response.data.data.valid;
    } catch {
      return false;
    }
  }

  isAuthenticated(): boolean {
    return !!Cookies.get(COOKIE_TOKEN_KEY);
  }
}

export const authService = new AuthService();
