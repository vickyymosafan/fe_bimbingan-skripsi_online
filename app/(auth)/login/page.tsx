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
import { LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Format email tidak valid').min(1, 'Email harus diisi'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success('Login berhasil!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Login gagal. Periksa kembali kredensial Anda.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Masuk ke SIBMO</CardTitle>
        <CardDescription>
          Sistem Informasi Bimbingan Mahasiswa Online
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="Masukkan email Anda"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Masukkan password"
            error={errors.password?.message}
            {...register('password')}
          />

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            className="mt-2"
          >
            {isLoading ? 'Memproses...' : (
              <>
                <LogIn className="w-5 h-5" />
                Masuk
              </>
            )}
          </Button>

          <p className="text-sm text-center text-muted-foreground mt-4">
            Belum punya akun?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Daftar di sini
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
