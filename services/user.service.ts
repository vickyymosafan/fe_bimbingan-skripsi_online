import api from '@/lib/api/axios';
import {
  User,
  ChangePasswordRequest,
  UpdateUserRequest,
} from '@/types/user.types';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';

class UserService {
  async getUsers(params?: PaginationParams): Promise<PaginatedResponse<User>> {
    const response = await api.get<PaginatedResponse<User>>('/users', { params });
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    return response.data.data;
  }

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await api.patch<ApiResponse<User>>(`/users/${id}`, data);
    return response.data.data;
  }

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }

  async restoreUser(id: string): Promise<User> {
    const response = await api.patch<ApiResponse<User>>(`/users/${id}/restore`);
    return response.data.data;
  }

  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await api.patch('/users/change-password', data);
  }

  async getActiveDosen(): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>('/users/dosen/active');
    return response.data.data;
  }
}

export const userService = new UserService();
