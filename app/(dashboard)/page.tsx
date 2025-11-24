'use client';

import { useAuth } from '@/providers/auth-provider';
import { UserRole } from '@/types/user.types';
import { useQuery } from '@tanstack/react-query';
import { proposalService } from '@/services/proposal.service';
import { bimbinganService } from '@/services/bimbingan.service';
import { StatsWidget } from '@/components/features/stats-widget';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, MessageSquare, Calendar, TrendingUp } from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { formatDate } from '@/lib/utils/format';
import { BIMBINGAN_STATUS_LABELS } from '@/lib/utils/constants';

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: statistics, isLoading: loadingStats } = useQuery({
    queryKey: ['proposal-statistics'],
    queryFn: () => proposalService.getStatistics(),
  });

  const { data: upcomingBimbingan, isLoading: loadingBimbingan } = useQuery({
    queryKey: ['upcoming-bimbingan'],
    queryFn: () => bimbinganService.getUpcoming(),
  });

  const isLoading = loadingStats || loadingBimbingan;

  if (isLoading) {
    return <LoadingSpinner fullScreen text="Memuat dashboard..." />;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">Selamat Datang, {user?.nama}!</h1>
        <p className="text-muted-foreground mt-2">
          {user?.role === UserRole.MAHASISWA && 'Pantau progress bimbingan tugas akhir Anda'}
          {user?.role === UserRole.DOSEN && 'Kelola bimbingan mahasiswa Anda'}
          {user?.role === UserRole.ADMIN && 'Kelola sistem bimbingan online'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsWidget
          title="Total Proposal"
          value={statistics?.totalProposals || 0}
          icon={FileText}
          colorClass="text-chart-2"
        />
        <StatsWidget
          title="Proposal Diterima"
          value={statistics?.diterima || 0}
          icon={TrendingUp}
          colorClass="text-chart-3"
        />
        <StatsWidget
          title="Menunggu Review"
          value={statistics?.diajukan || 0}
          icon={Calendar}
          colorClass="text-chart-1"
        />
        <StatsWidget
          title="Bimbingan Mendatang"
          value={upcomingBimbingan?.length || 0}
          icon={MessageSquare}
          colorClass="text-chart-4"
        />
      </div>

      {/* Recent Bimbingan */}
      {upcomingBimbingan && upcomingBimbingan.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Jadwal Bimbingan Mendatang</CardTitle>
            <CardDescription>Daftar bimbingan yang akan datang</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {upcomingBimbingan.slice(0, 5).map((bimbingan) => (
                <div
                  key={bimbingan.id}
                  className="flex items-center justify-between p-4 border border-border rounded-[calc(var(--radius)-0.5rem)] hover:bg-accent transition-colors"
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{bimbingan.topik}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(bimbingan.tanggal)} - {bimbingan.waktuMulai}
                    </p>
                    {user?.role === UserRole.DOSEN && bimbingan.mahasiswa && (
                      <p className="text-sm text-muted-foreground">
                        Mahasiswa: {bimbingan.mahasiswa.nama}
                      </p>
                    )}
                  </div>
                  <div className="text-sm font-medium text-chart-2">
                    {BIMBINGAN_STATUS_LABELS[bimbingan.status]}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
          <CardDescription>Navigasi cepat ke fitur utama</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.role === UserRole.MAHASISWA && (
              <>
                <a
                  href="/proposal/buat"
                  className="flex flex-col items-center gap-2 p-6 border border-border rounded-[calc(var(--radius)-0.5rem)] hover:bg-accent transition-colors"
                >
                  <FileText className="w-8 h-8 text-chart-2" />
                  <span className="font-medium">Ajukan Proposal</span>
                </a>
                <a
                  href="/bimbingan"
                  className="flex flex-col items-center gap-2 p-6 border border-border rounded-[calc(var(--radius)-0.5rem)] hover:bg-accent transition-colors"
                >
                  <MessageSquare className="w-8 h-8 text-chart-3" />
                  <span className="font-medium">Jadwalkan Bimbingan</span>
                </a>
                <a
                  href="/progress"
                  className="flex flex-col items-center gap-2 p-6 border border-border rounded-[calc(var(--radius)-0.5rem)] hover:bg-accent transition-colors"
                >
                  <TrendingUp className="w-8 h-8 text-chart-4" />
                  <span className="font-medium">Lihat Progress</span>
                </a>
              </>
            )}
            {user?.role === UserRole.DOSEN && (
              <>
                <a
                  href="/proposal"
                  className="flex flex-col items-center gap-2 p-6 border border-border rounded-[calc(var(--radius)-0.5rem)] hover:bg-accent transition-colors"
                >
                  <FileText className="w-8 h-8 text-chart-2" />
                  <span className="font-medium">Review Proposal</span>
                </a>
                <a
                  href="/bimbingan"
                  className="flex flex-col items-center gap-2 p-6 border border-border rounded-[calc(var(--radius)-0.5rem)] hover:bg-accent transition-colors"
                >
                  <MessageSquare className="w-8 h-8 text-chart-3" />
                  <span className="font-medium">Kelola Bimbingan</span>
                </a>
                <a
                  href="/jadwal"
                  className="flex flex-col items-center gap-2 p-6 border border-border rounded-[calc(var(--radius)-0.5rem)] hover:bg-accent transition-colors"
                >
                  <Calendar className="w-8 h-8 text-chart-4" />
                  <span className="font-medium">Atur Jadwal</span>
                </a>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
