import api from '@/lib/api/axios';
import { Notifikasi, CreateNotifikasiRequest } from '@/types/notifikasi.types';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';

class NotifikasiService {
  async getNotifikasis(params?: PaginationParams): Promise<PaginatedResponse<Notifikasi>> {
    const response = await api.get<PaginatedResponse<Notifikasi>>('/notifikasi', { params });
    return response.data;
  }

  async getNotifikasiById(id: string): Promise<Notifikasi> {
    const response = await api.get<ApiResponse<Notifikasi>>(`/notifikasi/${id}`);
    return response.data.data;
  }

  async createNotifikasi(data: CreateNotifikasiRequest): Promise<Notifikasi> {
    const response = await api.post<ApiResponse<Notifikasi>>('/notifikasi', data);
    return response.data.data;
  }

  async markAsRead(id: string): Promise<Notifikasi> {
    const response = await api.patch<ApiResponse<Notifikasi>>(`/notifikasi/${id}/read`);
    return response.data.data;
  }

  async markAllAsRead(): Promise<void> {
    await api.post('/notifikasi/read-all');
  }

  async deleteNotifikasi(id: string): Promise<void> {
    await api.delete(`/notifikasi/${id}`);
  }

  async getUnreadCount(): Promise<number> {
    const response = await api.get<ApiResponse<{ count: number }>>('/notifikasi/unread/count');
    return response.data.data.count;
  }
}

export const notifikasiService = new NotifikasiService();
