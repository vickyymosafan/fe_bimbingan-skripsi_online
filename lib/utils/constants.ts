import { ProposalStatus } from '@/types/proposal.types';
import { BimbinganStatus, BimbinganType } from '@/types/bimbingan.types';
import { NotifikasiPriority, NotifikasiType } from '@/types/notifikasi.types';
import { DokumenStatus, DokumenType } from '@/types/dokumen.types';
import { ProgressTahapan } from '@/types/progress.types';
import { UserRole } from '@/types/user.types';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1';

export const COOKIE_TOKEN_KEY = 'sibmo_token';
export const COOKIE_REFRESH_TOKEN_KEY = 'sibmo_refresh_token';

export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  [ProposalStatus.DRAFT]: 'Draft',
  [ProposalStatus.DIAJUKAN]: 'Diajukan',
  [ProposalStatus.DITERIMA]: 'Diterima',
  [ProposalStatus.DITOLAK]: 'Ditolak',
  [ProposalStatus.REVISI]: 'Perlu Revisi',
  [ProposalStatus.SELESAI]: 'Selesai',
};

export const PROPOSAL_STATUS_COLORS: Record<ProposalStatus, string> = {
  [ProposalStatus.DRAFT]: 'bg-muted text-muted-foreground',
  [ProposalStatus.DIAJUKAN]: 'bg-chart-2 text-primary-foreground',
  [ProposalStatus.DITERIMA]: 'bg-chart-3 text-primary-foreground',
  [ProposalStatus.DITOLAK]: 'bg-destructive text-destructive-foreground',
  [ProposalStatus.REVISI]: 'bg-chart-1 text-primary-foreground',
  [ProposalStatus.SELESAI]: 'bg-chart-5 text-primary-foreground',
};

export const BIMBINGAN_STATUS_LABELS: Record<BimbinganStatus, string> = {
  [BimbinganStatus.DIJADWALKAN]: 'Dijadwalkan',
  [BimbinganStatus.BERLANGSUNG]: 'Berlangsung',
  [BimbinganStatus.SELESAI]: 'Selesai',
  [BimbinganStatus.DIBATALKAN]: 'Dibatalkan',
  [BimbinganStatus.DITUNDA]: 'Ditunda',
};

export const BIMBINGAN_STATUS_COLORS: Record<BimbinganStatus, string> = {
  [BimbinganStatus.DIJADWALKAN]: 'bg-chart-2 text-primary-foreground',
  [BimbinganStatus.BERLANGSUNG]: 'bg-chart-1 text-primary-foreground',
  [BimbinganStatus.SELESAI]: 'bg-chart-5 text-primary-foreground',
  [BimbinganStatus.DIBATALKAN]: 'bg-destructive text-destructive-foreground',
  [BimbinganStatus.DITUNDA]: 'bg-muted text-muted-foreground',
};

export const BIMBINGAN_TYPE_LABELS: Record<BimbinganType, string> = {
  [BimbinganType.ONLINE]: 'Online',
  [BimbinganType.OFFLINE]: 'Offline',
  [BimbinganType.HYBRID]: 'Hybrid',
};

export const NOTIFIKASI_TYPE_LABELS: Record<NotifikasiType, string> = {
  [NotifikasiType.BIMBINGAN]: 'Bimbingan',
  [NotifikasiType.JADWAL]: 'Jadwal',
  [NotifikasiType.DOKUMEN]: 'Dokumen',
  [NotifikasiType.PROPOSAL]: 'Proposal',
  [NotifikasiType.PROGRESS]: 'Progress',
  [NotifikasiType.SISTEM]: 'Sistem',
  [NotifikasiType.REMINDER]: 'Pengingat',
  [NotifikasiType.PENGUMUMAN]: 'Pengumuman',
};

export const NOTIFIKASI_PRIORITY_COLORS: Record<NotifikasiPriority, string> = {
  [NotifikasiPriority.LOW]: 'bg-muted',
  [NotifikasiPriority.MEDIUM]: 'bg-chart-2',
  [NotifikasiPriority.HIGH]: 'bg-chart-1',
  [NotifikasiPriority.URGENT]: 'bg-destructive',
};

export const DOKUMEN_TYPE_LABELS: Record<DokumenType, string> = {
  [DokumenType.PROPOSAL]: 'Proposal',
  [DokumenType.BAB_1]: 'BAB 1',
  [DokumenType.BAB_2]: 'BAB 2',
  [DokumenType.BAB_3]: 'BAB 3',
  [DokumenType.BAB_4]: 'BAB 4',
  [DokumenType.BAB_5]: 'BAB 5',
  [DokumenType.LAMPIRAN]: 'Lampiran',
  [DokumenType.PRESENTASI]: 'Presentasi',
  [DokumenType.JURNAL]: 'Jurnal',
  [DokumenType.LAINNYA]: 'Lainnya',
};

export const DOKUMEN_STATUS_LABELS: Record<DokumenStatus, string> = {
  [DokumenStatus.DRAFT]: 'Draft',
  [DokumenStatus.SUBMITTED]: 'Dikirim',
  [DokumenStatus.REVIEWED]: 'Direview',
  [DokumenStatus.APPROVED]: 'Disetujui',
  [DokumenStatus.REVISION_NEEDED]: 'Perlu Revisi',
};

export const PROGRESS_TAHAPAN_LABELS: Record<ProgressTahapan, string> = {
  [ProgressTahapan.PROPOSAL]: 'Proposal',
  [ProgressTahapan.BAB_1]: 'BAB 1 - Pendahuluan',
  [ProgressTahapan.BAB_2]: 'BAB 2 - Tinjauan Pustaka',
  [ProgressTahapan.BAB_3]: 'BAB 3 - Metodologi',
  [ProgressTahapan.BAB_4]: 'BAB 4 - Hasil & Pembahasan',
  [ProgressTahapan.BAB_5]: 'BAB 5 - Kesimpulan',
  [ProgressTahapan.SEMINAR_PROPOSAL]: 'Seminar Proposal',
  [ProgressTahapan.PENGUMPULAN_DATA]: 'Pengumpulan Data',
  [ProgressTahapan.ANALISIS_DATA]: 'Analisis Data',
  [ProgressTahapan.SEMINAR_HASIL]: 'Seminar Hasil',
  [ProgressTahapan.SIDANG_SKRIPSI]: 'Sidang Skripsi',
  [ProgressTahapan.REVISI_AKHIR]: 'Revisi Akhir',
  [ProgressTahapan.SELESAI]: 'Selesai',
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Admin',
  [UserRole.DOSEN]: 'Dosen',
  [UserRole.MAHASISWA]: 'Mahasiswa',
};
