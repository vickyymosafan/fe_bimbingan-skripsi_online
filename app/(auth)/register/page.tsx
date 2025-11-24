'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import { useToast } from '@/hooks/use-toast';
import { UserPlus } from 'lucide-react';

const registerSchema = z.object({
  nama: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  nim: z.string().min(5, 'NIM minimal 5 karakter'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string(),
  jurusan: z.string().optional(),
  fakultas: z.string().optional(),
  noTelepon: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { confirmPassword, ...registerData } = data;
      await registerUser(registerData);
      toast.success('Registrasi berhasil! Selamat datang.');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registrasi gagal. Silakan coba lagi.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Daftar Akun Mahasiswa</CardTitle>
        <CardDescription>
          Sistem Informasi Bimbingan Mahasiswa Online
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            error={errors.nama?.message}
            {...register('nama')}
          />

          <Input
            label="NIM"
            placeholder="Masukkan NIM"
            error={errors.nim?.message}
            {...register('nim')}
          />

          <Input
            type="email"
            label="Email"
            placeholder="Masukkan email"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Jurusan"
            placeholder="Masukkan jurusan (opsional)"
            error={errors.jurusan?.message}
            {...register('jurusan')}
          />

          <Input
            label="Fakultas"
            placeholder="Masukkan fakultas (opsional)"
            error={errors.fakultas?.message}
            {...register('fakultas')}
          />

          <Input
            label="No. Telepon"
            placeholder="Masukkan no. telepon (opsional)"
            error={errors.noTelepon?.message}
            {...register('noTelepon')}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Masukkan password"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            type="password"
            label="Konfirmasi Password"
            placeholder="Masukkan ulang password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            className="mt-2"
          >
            {isLoading ? 'Memproses...' : (
              <>
                <UserPlus className="w-5 h-5" />
                Daftar
              </>
            )}
          </Button>

          <p className="text-sm text-center text-muted-foreground mt-4">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Masuk di sini
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
