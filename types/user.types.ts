export enum UserRole {
  ADMIN = 'ADMIN',
  DOSEN = 'DOSEN',
  MAHASISWA = 'MAHASISWA',
}

export interface User {
  id: string;
  nama: string;
  email: string;
  nim?: string;
  nip?: string;
  role: UserRole;
  noTelepon?: string;
  jurusan?: string;
  fakultas?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string; // Email untuk login
  password: string;
}

export interface RegisterRequest {
  nama: string;
  email: string;
  password: string;
  nim: string;
  noTelepon?: string;
  jurusan?: string;
  fakultas?: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserRequest {
  nama?: string;
  email?: string;
  noTelepon?: string;
  jurusan?: string;
  fakultas?: string;
}
