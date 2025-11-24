import { User } from './user.types';
import { Proposal } from './proposal.types';

export enum BimbinganStatus {
  DIJADWALKAN = 'DIJADWALKAN',
  BERLANGSUNG = 'BERLANGSUNG',
  SELESAI = 'SELESAI',
  DIBATALKAN = 'DIBATALKAN',
  DITUNDA = 'DITUNDA',
}

export enum BimbinganType {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  HYBRID = 'HYBRID',
}

export interface Bimbingan {
  id: string;
  topik: string;
  catatan?: string;
  hasilBimbingan?: string;
  tanggal: string;
  waktuMulai: string;
  waktuSelesai?: string;
  status: BimbinganStatus;
  tipeBimbingan: BimbinganType;
  lokasi?: string;
  linkMeeting?: string;
  nomorPertemuan: number;
  isUrgent: boolean;
  agendaBimbingan?: string;
  tugasSelanjutnya?: string;
  nilaiProgress?: number;
  mahasiswaHadir: boolean;
  dosenHadir: boolean;
  alasanTidakHadir?: string;
  attachments?: string[];
  proposal?: Proposal;
  proposalId: string;
  mahasiswa?: User;
  mahasiswaId: string;
  dosen?: User;
  dosenId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBimbinganRequest {
  proposalId: string;
  topik: string;
  tanggal: string;
  waktuMulai: string;
  tipeBimbingan: BimbinganType;
  lokasi?: string;
  linkMeeting?: string;
  agendaBimbingan?: string;
  isUrgent?: boolean;
}

export interface UpdateBimbinganRequest {
  topik?: string;
  catatan?: string;
  hasilBimbingan?: string;
  tanggal?: string;
  waktuMulai?: string;
  waktuSelesai?: string;
  status?: BimbinganStatus;
  tipeBimbingan?: BimbinganType;
  lokasi?: string;
  linkMeeting?: string;
  agendaBimbingan?: string;
  tugasSelanjutnya?: string;
  nilaiProgress?: number;
  mahasiswaHadir?: boolean;
  dosenHadir?: boolean;
  alasanTidakHadir?: string;
}

export interface FinishBimbinganRequest {
  hasilBimbingan: string;
  tugasSelanjutnya?: string;
  nilaiProgress?: number;
  mahasiswaHadir: boolean;
  dosenHadir: boolean;
}
