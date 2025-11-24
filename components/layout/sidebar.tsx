'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { useAuth } from '@/providers/auth-provider';
import { UserRole } from '@/types/user.types';
import {
  Home,
  FileText,
  MessageSquare,
  Calendar,
  TrendingUp,
  FolderOpen,
  Bell,
  User,
  Users,
  LogOut,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: <Home className="w-5 h-5" /> },
  { label: 'Proposal', href: '/proposal', icon: <FileText className="w-5 h-5" /> },
  { label: 'Bimbingan', href: '/bimbingan', icon: <MessageSquare className="w-5 h-5" /> },
  { label: 'Jadwal', href: '/jadwal', icon: <Calendar className="w-5 h-5" /> },
  { label: 'Progress', href: '/progress', icon: <TrendingUp className="w-5 h-5" /> },
  { label: 'Dokumen', href: '/dokumen', icon: <FolderOpen className="w-5 h-5" /> },
  { label: 'Notifikasi', href: '/notifikasi', icon: <Bell className="w-5 h-5" /> },
  { label: 'Profil', href: '/profil', icon: <User className="w-5 h-5" /> },
  {
    label: 'Manajemen User',
    href: '/users',
    icon: <Users className="w-5 h-5" />,
    roles: [UserRole.ADMIN],
  },
];

export function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter((item) => {
    if (!item.roles) return true;
    return user && item.roles.includes(user.role);
  });

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-sidebar border-r border-sidebar-border',
          'transition-transform duration-300 lg:translate-x-0',
          'w-64 flex flex-col',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-foreground">SIBMO</h1>
          <p className="text-sm text-sidebar-foreground/60 mt-1">
            {user?.nama}
          </p>
          <p className="text-xs text-sidebar-foreground/40 uppercase">
            {user?.role}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-1">
            {filteredNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-[calc(var(--radius)-1rem)]',
                      'transition-all font-medium',
                      isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-[calc(var(--radius)-1rem)]
                     text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground
                     transition-all font-medium"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
