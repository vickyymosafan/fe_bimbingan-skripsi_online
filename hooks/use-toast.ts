import { toast as sonnerToast } from 'sonner';

export interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
}

export function useToast() {
  const toast = {
    success: (message: string, options?: ToastOptions) => {
      sonnerToast.success(options?.title || 'Berhasil', {
        description: message,
        duration: options?.duration || 3000,
      });
    },
    error: (message: string, options?: ToastOptions) => {
      sonnerToast.error(options?.title || 'Gagal', {
        description: message,
        duration: options?.duration || 4000,
      });
    },
    info: (message: string, options?: ToastOptions) => {
      sonnerToast.info(options?.title || 'Informasi', {
        description: message,
        duration: options?.duration || 3000,
      });
    },
    warning: (message: string, options?: ToastOptions) => {
      sonnerToast.warning(options?.title || 'Peringatan', {
        description: message,
        duration: options?.duration || 3500,
      });
    },
  };

  return { toast };
}
