import api from '@/lib/api/axios';
import {
  Progress,
  CreateProgressRequest,
  UpdateProgressRequest,
} from '@/types/progress.types';
import { ApiResponse } from '@/types/api.types';

class ProgressService {
  async getProgressByProposal(proposalId: string): Promise<Progress[]> {
    const response = await api.get<ApiResponse<Progress[]>>(`/progress/proposal/${proposalId}`);
    return response.data.data;
  }

  async getProgressById(id: string): Promise<Progress> {
    const response = await api.get<ApiResponse<Progress>>(`/progress/${id}`);
    return response.data.data;
  }

  async createProgress(data: CreateProgressRequest): Promise<Progress> {
    const response = await api.post<ApiResponse<Progress>>('/progress', data);
    return response.data.data;
  }

  async updateProgress(id: string, data: UpdateProgressRequest): Promise<Progress> {
    const response = await api.patch<ApiResponse<Progress>>(`/progress/${id}`, data);
    return response.data.data;
  }

  async deleteProgress(id: string): Promise<void> {
    await api.delete(`/progress/${id}`);
  }
}

export const progressService = new ProgressService();
