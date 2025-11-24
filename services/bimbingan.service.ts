import api from '@/lib/api/axios';
import {
  Bimbingan,
  CreateBimbinganRequest,
  UpdateBimbinganRequest,
  FinishBimbinganRequest,
} from '@/types/bimbingan.types';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';

class BimbinganService {
  async getBimbingans(params?: PaginationParams): Promise<PaginatedResponse<Bimbingan>> {
    const response = await api.get<PaginatedResponse<Bimbingan>>('/bimbingan', { params });
    return response.data;
  }

  async getBimbinganById(id: string): Promise<Bimbingan> {
    const response = await api.get<ApiResponse<Bimbingan>>(`/bimbingan/${id}`);
    return response.data.data;
  }

  async createBimbingan(data: CreateBimbinganRequest): Promise<Bimbingan> {
    const response = await api.post<ApiResponse<Bimbingan>>('/bimbingan', data);
    return response.data.data;
  }

  async updateBimbingan(id: string, data: UpdateBimbinganRequest): Promise<Bimbingan> {
    const response = await api.patch<ApiResponse<Bimbingan>>(`/bimbingan/${id}`, data);
    return response.data.data;
  }

  async deleteBimbingan(id: string): Promise<void> {
    await api.delete(`/bimbingan/${id}`);
  }

  async startBimbingan(id: string): Promise<Bimbingan> {
    const response = await api.post<ApiResponse<Bimbingan>>(`/bimbingan/${id}/start`);
    return response.data.data;
  }

  async finishBimbingan(id: string, data: FinishBimbinganRequest): Promise<Bimbingan> {
    const response = await api.post<ApiResponse<Bimbingan>>(`/bimbingan/${id}/finish`, data);
    return response.data.data;
  }

  async getUpcoming(): Promise<Bimbingan[]> {
    const response = await api.get<ApiResponse<Bimbingan[]>>('/bimbingan/upcoming');
    return response.data.data;
  }

  async getHistory(proposalId: string): Promise<Bimbingan[]> {
    const response = await api.get<ApiResponse<Bimbingan[]>>(`/bimbingan/history/${proposalId}`);
    return response.data.data;
  }
}

export const bimbinganService = new BimbinganService();
