# SIBMO Frontend - Sistem Bimbingan Online

Frontend untuk Sistem Informasi Bimbingan Mahasiswa Online menggunakan Next.js 16 dengan App Router.

## 🎯 Teknologi yang Digunakan

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: 
  - React Query (TanStack Query) untuk server state
  - React Context untuk auth & global state
- **Form Handling**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Date Handling**: date-fns

## 📁 Struktur Proyek

```
frontend/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Auth route group (login, register)
│   ├── (dashboard)/         # Dashboard route group (protected)
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles & CSS variables
├── components/
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components (Sidebar, Navbar)
│   ├── features/            # Feature-specific components
│   └── shared/              # Shared utility components
├── lib/
│   ├── api/                 # Axios configuration
│   └── utils/               # Utility functions
├── services/                # API service layer
├── hooks/                   # Custom React hooks
├── providers/               # React Context providers
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Buat file `.env.local` di root folder frontend:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api/v1
```

### 3. Jalankan Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

### 4. Build untuk Production

```bash
npm run build
npm start
```

## 🎨 Design System

### CSS Variables

Proyek ini menggunakan CSS variables yang telah dikonfigurasi sesuai spesifikasi:
- **Primary Color**: `#fafafa` (solid white)
- **Background**: `#09090b` (hitam pekat)
- **Border Radius**: `2rem` (super rounded/pill-like)
- **Design Philosophy**: Flat design, no gradients

### Component Library

Komponen UI reusable yang tersedia:
- `Button` - 3 varian (default, outline, ghost)
- `Card` - Container dengan styling konsisten
- `Input/Textarea` - Form inputs dengan validasi
- `Badge` - Status indicators
- `Modal` - Dialog/popup
- `LoadingSpinner` - Loading states

## 🔐 Authentication Flow

1. User mengakses `/login` atau `/register`
2. Setelah login berhasil, token disimpan di cookies
3. AuthProvider melakukan validasi token otomatis
4. User diarahkan ke dashboard sesuai role
5. Axios interceptor otomatis inject token ke setiap request
6. Jika token expired, sistem otomatis refresh token atau redirect ke login

## 📦 Service Layer

Semua komunikasi dengan backend dilakukan melalui service layer:

```typescript
// Contoh penggunaan
import { proposalService } from '@/services/proposal.service';

// Get proposals
const proposals = await proposalService.getProposals();

// Create proposal
const newProposal = await proposalService.createProposal(data);
```

Service yang tersedia:
- `authService` - Authentication & user profile
- `userService` - User management
- `proposalService` - Proposal CRUD & workflows
- `bimbinganService` - Bimbingan/konsultasi management
- `notifikasiService` - Notifications
- `dokumenService` - Document management
- `progressService` - Progress tracking

## 🪝 Custom Hooks

- `useAuth()` - Access authentication context
- `useDebounce(value, delay)` - Debounce values
- `useToast()` - Show toast notifications

## 🎯 Route Structure

### Public Routes
- `/login` - Halaman login
- `/register` - Halaman registrasi mahasiswa

### Protected Routes (Dashboard)
- `/` - Dashboard home
- `/proposal` - Daftar proposal
- `/proposal/buat` - Form pengajuan proposal
- `/proposal/[id]` - Detail proposal
- `/bimbingan` - Daftar bimbingan
- `/bimbingan/[id]` - Detail & chat bimbingan
- `/jadwal` - Kalender jadwal
- `/progress` - Progress tugas akhir
- `/dokumen` - Dokumen revisi
- `/notifikasi` - Notifikasi
- `/profil` - Profil user

### Admin Only
- `/users` - Manajemen user

## 🔧 Development Guidelines

### Naming Conventions
- **Components**: PascalCase (`Button.tsx`, `ProposalCard.tsx`)
- **Functions/Variables**: camelCase (`getUserProfile`, `isLoading`)
- **Types/Interfaces**: PascalCase (`User`, `Proposal`)
- **Files**: kebab-case untuk non-components (`auth.service.ts`, `use-debounce.ts`)

### TypeScript
- No `any` types - semua harus strictly typed
- Gunakan interfaces untuk object shapes
- Gunakan enums untuk konstanta

### Bahasa
- **UI Text**: Bahasa Indonesia
- **Code & Comments**: Bahasa Indonesia untuk dokumentasi
- **Variable Names**: English (standar programming)

## 📱 Responsive Design

Aplikasi menggunakan mobile-first approach:
- **Mobile**: < 768px (1 column layout)
- **Tablet**: 768px - 1024px (Sidebar collapsible)
- **Desktop**: > 1024px (Sidebar fixed, multi-column layout)

## 🔍 React Query Usage

Contoh penggunaan React Query untuk fetching data:

```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { proposalService } from '@/services/proposal.service';

// Query
const { data, isLoading, error } = useQuery({
  queryKey: ['proposals'],
  queryFn: () => proposalService.getProposals(),
});

// Mutation
const { mutate, isPending } = useMutation({
  mutationFn: proposalService.createProposal,
  onSuccess: () => {
    toast.success('Proposal berhasil dibuat');
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
```

## 🎭 Role-Based Access

Tiga role user:
- **MAHASISWA**: Dapat mengajukan proposal, jadwal bimbingan, upload dokumen
- **DOSEN**: Dapat review proposal, approve/reject, kelola jadwal bimbingan
- **ADMIN**: Full access, termasuk manajemen user

Conditional rendering berdasarkan role:

```typescript
const { user } = useAuth();

{user?.role === UserRole.MAHASISWA && (
  <Button>Ajukan Proposal</Button>
)}

{user?.role === UserRole.DOSEN && (
  <Button>Review Proposal</Button>
)}
```

## 🚨 Error Handling

- API errors ditangani di axios interceptor
- Form validation menggunakan Zod schemas
- Toast notifications untuk feedback user
- Error boundaries untuk unexpected errors

## 📝 TODO: Implementasi Selanjutnya

Fitur-fitur yang belum diimplementasi (tersedia struktur & service):

1. **Modul Proposal** (Detail & Form lengkap)
   - List proposal dengan filter & search
   - Form pengajuan proposal dengan upload file
   - Detail proposal dengan timeline
   - Action buttons (submit, approve, reject)

2. **Modul Bimbingan & Chat**
   - List bimbingan (upcoming & history)
   - Chat interface (WhatsApp-like)
   - Upload attachment dalam chat
   - Start/Finish bimbingan

3. **Modul Jadwal**
   - Calendar view
   - Slot booking
   - Recurring schedule

4. **Modul Progress**
   - Timeline visual
   - Stepper untuk tahapan TA
   - Progress tracking per chapter

5. **Modul Dokumen**
   - List dokumen dengan versi
   - Upload & download
   - Review & feedback dosen

6. **Modul Notifikasi**
   - List notifikasi
   - Mark as read
   - Filter by type

7. **Modul Profil**
   - Edit profil
   - Change password
   - Upload foto profil

## 🤝 Contributing

Untuk menambahkan fitur baru:
1. Buat types di folder `types/`
2. Buat service method di folder `services/`
3. Buat UI components di `components/`
4. Buat page di `app/(dashboard)/`
5. Gunakan React Query untuk data fetching
6. Implement error handling & loading states

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

## ⚡ Performance Tips

- Gunakan `next/image` untuk optimasi gambar
- Implement code splitting dengan dynamic imports
- Lazy load komponen yang tidak critical
- Gunakan React Query caching secara optimal
- Minimize bundle size dengan tree-shaking

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**Maintainer**: Development Team
