import { Proposal } from './proposal.types';

export enum ProgressTahapan {
  PROPOSAL = 'PROPOSAL',
  BAB_1 = 'BAB_1',
  BAB_2 = 'BAB_2',
  BAB_3 = 'BAB_3',
  BAB_4 = 'BAB_4',
  BAB_5 = 'BAB_5',
  SEMINAR_PROPOSAL = 'SEMINAR_PROPOSAL',
  PENGUMPULAN_DATA = 'PENGUMPULAN_DATA',
  ANALISIS_DATA = 'ANALISIS_DATA',
  SEMINAR_HASIL = 'SEMINAR_HASIL',
  SIDANG_SKRIPSI = 'SIDANG_SKRIPSI',
  REVISI_AKHIR = 'REVISI_AKHIR',
  SELESAI = 'SELESAI',
}

export interface Progress {
  id: string;
  tahapan: ProgressTahapan;
  persentase: number;
  deskripsi?: string;
  tanggalMulai?: string;
  tanggalSelesai?: string;
  targetSelesai?: string;
  isCompleted: boolean;
  catatan?: string;
  hambatan?: string;
  milestones?: string[];
  jumlahRevisi: number;
  proposal?: Proposal;
  proposalId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProgressRequest {
  proposalId: string;
  tahapan: ProgressTahapan;
  persentase?: number;
  deskripsi?: string;
  targetSelesai?: string;
  milestones?: string[];
}

export interface UpdateProgressRequest {
  persentase?: number;
  deskripsi?: string;
  tanggalSelesai?: string;
  targetSelesai?: string;
  isCompleted?: boolean;
  catatan?: string;
  hambatan?: string;
  milestones?: string[];
}
