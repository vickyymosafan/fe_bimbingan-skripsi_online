import { User } from './user.types';
import { Bimbingan } from './bimbingan.types';

export enum DokumenType {
  PROPOSAL = 'PROPOSAL',
  BAB_1 = 'BAB_1',
  BAB_2 = 'BAB_2',
  BAB_3 = 'BAB_3',
  BAB_4 = 'BAB_4',
  BAB_5 = 'BAB_5',
  LAMPIRAN = 'LAMPIRAN',
  PRESENTASI = 'PRESENTASI',
  JURNAL = 'JURNAL',
  LAINNYA = 'LAINNYA',
}

export enum DokumenStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  REVIEWED = 'REVIEWED',
  APPROVED = 'APPROVED',
  REVISION_NEEDED = 'REVISION_NEEDED',
}

export interface DokumenRevisi {
  id: string;
  namaFile: string;
  urlFile: string;
  versi: number;
  tipeDokumen: DokumenType;
  status: DokumenStatus;
  komentar?: string;
  feedbackDosen?: string;
  ukuranFile?: number;
  mimeType?: string;
  bimbingan?: Bimbingan;
  bimbinganId: string;
  uploadedBy?: User;
  uploadedById: string;
  reviewedBy?: User;
  reviewedById?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadDokumenRequest {
  bimbinganId: string;
  namaFile: string;
  urlFile: string;
  tipeDokumen: DokumenType;
  komentar?: string;
  ukuranFile?: number;
  mimeType?: string;
}

export interface ReviewDokumenRequest {
  status: DokumenStatus;
  feedbackDosen?: string;
}
