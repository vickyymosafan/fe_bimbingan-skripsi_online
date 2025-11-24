import { User } from './user.types';

export enum ProposalStatus {
  DRAFT = 'DRAFT',
  DIAJUKAN = 'DIAJUKAN',
  DITERIMA = 'DITERIMA',
  DITOLAK = 'DITOLAK',
  REVISI = 'REVISI',
  SELESAI = 'SELESAI',
}

export interface Proposal {
  id: string;
  judul: string;
  deskripsi: string;
  abstrak?: string;
  bidangKajian?: string;
  metodePenelitian?: string;
  status: ProposalStatus;
  catatanRevisi?: string;
  alasanPenolakan?: string;
  tanggalPengajuan?: string;
  tanggalDisetujui?: string;
  targetSelesai?: string;
  fileProposal?: string;
  jumlahRevisi: number;
  mahasiswa?: User;
  mahasiswaId: string;
  dosenPembimbing?: User;
  dosenPembimbingId?: string;
  dosenPenguji1?: User;
  dosenPenguji1Id?: string;
  dosenPenguji2?: User;
  dosenPenguji2Id?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProposalRequest {
  judul: string;
  deskripsi: string;
  abstrak?: string;
  bidangKajian?: string;
  metodePenelitian?: string;
  dosenPembimbingId?: string;
  targetSelesai?: string;
  fileProposal?: string;
}

export interface UpdateProposalRequest {
  judul?: string;
  deskripsi?: string;
  abstrak?: string;
  bidangKajian?: string;
  metodePenelitian?: string;
  dosenPembimbingId?: string;
  dosenPenguji1Id?: string;
  dosenPenguji2Id?: string;
  targetSelesai?: string;
  fileProposal?: string;
}

export interface ProposalStatistics {
  totalProposals: number;
  draft: number;
  diajukan: number;
  diterima: number;
  ditolak: number;
  revisi: number;
  selesai: number;
}

export interface ApproveProposalRequest {
  catatanRevisi?: string;
}

export interface RejectProposalRequest {
  alasanPenolakan: string;
}

export interface RevisionProposalRequest {
  catatanRevisi: string;
}
