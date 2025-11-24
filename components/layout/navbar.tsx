'use client';

import { Menu, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
// import { useQuery } from '@tanstack/react-query';
// import { notifikasiService } from '@/services/notifikasi.service';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  // TODO: Backend belum ada notifikasi controller, temporary disabled
  // const { data: unreadCount = 0 } = useQuery({
  //   queryKey: ['notifikasi-unread-count'],
  //   queryFn: () => notifikasiService.getUnreadCount(),
  //   refetchInterval: 30000,
  // });
  const unreadCount = 0; // Temporary hardcoded

  return (
    <header className="sticky top-0 z-30 bg-background border-b border-border h-16 flex items-center px-4 lg:px-6">
      <div className="flex items-center justify-between w-full">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-accent rounded-[calc(var(--radius)-1rem)] transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Title - Hidden on mobile, visible on desktop */}
        <h2 className="hidden lg:block text-lg font-semibold">Dashboard</h2>

        {/* Right Section - Notifications */}
        <div className="flex items-center gap-4 ml-auto">
          <button className="relative p-2 hover:bg-accent rounded-[calc(var(--radius)-1rem)] transition-colors">
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
