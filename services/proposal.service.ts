import api from '@/lib/api/axios';
import {
  Proposal,
  CreateProposalRequest,
  UpdateProposalRequest,
  ProposalStatistics,
  ApproveProposalRequest,
  RejectProposalRequest,
  RevisionProposalRequest,
} from '@/types/proposal.types';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api.types';

class ProposalService {
  async getProposals(params?: PaginationParams): Promise<PaginatedResponse<Proposal>> {
    const response = await api.get<PaginatedResponse<Proposal>>('/proposals', { params });
    return response.data;
  }

  async getProposalById(id: string): Promise<Proposal> {
    const response = await api.get<ApiResponse<Proposal>>(`/proposals/${id}`);
    return response.data.data;
  }

  async createProposal(data: CreateProposalRequest): Promise<Proposal> {
    const response = await api.post<ApiResponse<Proposal>>('/proposals', data);
    return response.data.data;
  }

  async updateProposal(id: string, data: UpdateProposalRequest): Promise<Proposal> {
    const response = await api.patch<ApiResponse<Proposal>>(`/proposals/${id}`, data);
    return response.data.data;
  }

  async deleteProposal(id: string): Promise<void> {
    await api.delete(`/proposals/${id}`);
  }

  async submitProposal(id: string): Promise<Proposal> {
    const response = await api.post<ApiResponse<Proposal>>(`/proposals/${id}/submit`);
    return response.data.data;
  }

  async approveProposal(id: string, data?: ApproveProposalRequest): Promise<Proposal> {
    const response = await api.post<ApiResponse<Proposal>>(`/proposals/${id}/approve`, data);
    return response.data.data;
  }

  async rejectProposal(id: string, data: RejectProposalRequest): Promise<Proposal> {
    const response = await api.post<ApiResponse<Proposal>>(`/proposals/${id}/reject`, data);
    return response.data.data;
  }

  async revisionProposal(id: string, data: RevisionProposalRequest): Promise<Proposal> {
    const response = await api.post<ApiResponse<Proposal>>(`/proposals/${id}/revision`, data);
    return response.data.data;
  }

  async getPendingReview(): Promise<Proposal[]> {
    const response = await api.get<ApiResponse<Proposal[]>>('/proposals/pending-review');
    return response.data.data;
  }

  async getStatistics(): Promise<ProposalStatistics> {
    const response = await api.get<ApiResponse<ProposalStatistics>>('/proposals/statistics');
    return response.data.data;
  }
}

export const proposalService = new ProposalService();
