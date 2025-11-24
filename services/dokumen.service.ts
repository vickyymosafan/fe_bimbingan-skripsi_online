import api from '@/lib/api/axios';
import {
  DokumenRevisi,
  UploadDokumenRequest,
  ReviewDokumenRequest,
} from '@/types/dokumen.types';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';

class DokumenService {
  async getDokumens(params?: PaginationParams): Promise<PaginatedResponse<DokumenRevisi>> {
    const response = await api.get<PaginatedResponse<DokumenRevisi>>('/dokumen', { params });
    return response.data;
  }

  async getDokumenById(id: string): Promise<DokumenRevisi> {
    const response = await api.get<ApiResponse<DokumenRevisi>>(`/dokumen/${id}`);
    return response.data.data;
  }

  async uploadDokumen(data: UploadDokumenRequest): Promise<DokumenRevisi> {
    const response = await api.post<ApiResponse<DokumenRevisi>>('/dokumen', data);
    return response.data.data;
  }

  async reviewDokumen(id: string, data: ReviewDokumenRequest): Promise<DokumenRevisi> {
    const response = await api.patch<ApiResponse<DokumenRevisi>>(`/dokumen/${id}/review`, data);
    return response.data.data;
  }

  async deleteDokumen(id: string): Promise<void> {
    await api.delete(`/dokumen/${id}`);
  }

  async getDokumensByBimbingan(bimbinganId: string): Promise<DokumenRevisi[]> {
    const response = await api.get<ApiResponse<DokumenRevisi[]>>(`/dokumen/bimbingan/${bimbinganId}`);
    return response.data.data;
  }
}

export const dokumenService = new DokumenService();
