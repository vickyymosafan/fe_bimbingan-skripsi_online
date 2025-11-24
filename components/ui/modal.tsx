'use client';

import { HTMLAttributes, ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils/cn';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  className,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in"
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          'relative bg-card border border-border rounded-[var(--radius)] shadow-xl',
          'animate-in zoom-in-95 slide-in-from-bottom-4',
          'w-full mx-4',
          {
            'max-w-md': size === 'sm',
            'max-w-2xl': size === 'md',
            'max-w-4xl': size === 'lg',
            'max-w-6xl': size === 'xl',
          },
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-border p-6">
            <h2 className="text-xl font-bold">{title}</h2>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-accent transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export const ModalHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-4', className)} {...props} />
);

export const ModalBody = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('my-4', className)} {...props} />
);

export const ModalFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-end gap-3 mt-6', className)} {...props} />
);
