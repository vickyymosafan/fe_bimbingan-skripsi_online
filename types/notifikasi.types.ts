import { User } from './user.types';

export enum NotifikasiType {
  BIMBINGAN = 'BIMBINGAN',
  JADWAL = 'JADWAL',
  DOKUMEN = 'DOKUMEN',
  PROPOSAL = 'PROPOSAL',
  PROGRESS = 'PROGRESS',
  SISTEM = 'SISTEM',
  REMINDER = 'REMINDER',
  PENGUMUMAN = 'PENGUMUMAN',
}

export enum NotifikasiPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export interface Notifikasi {
  id: string;
  judul: string;
  pesan: string;
  tipe: NotifikasiType;
  prioritas: NotifikasiPriority;
  isRead: boolean;
  readAt?: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
  scheduledAt?: string;
  isSent: boolean;
  sentAt?: string;
  isActive: boolean;
  user?: User;
  userId: string;
  sender?: User;
  senderId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotifikasiRequest {
  judul: string;
  pesan: string;
  tipe: NotifikasiType;
  prioritas?: NotifikasiPriority;
  userId: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
  scheduledAt?: string;
}
