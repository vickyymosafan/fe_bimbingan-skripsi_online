# 🐛 Bug Fix: "Rendered more hooks than during the previous render"

## ❌ Error yang Terjadi

```
Error: Rendered more hooks than during the previous render.
```

Error ini muncul di development mode karena **React Rules of Hooks** dilanggar.

## 🔍 Penyebab

### 1. **AuthProvider** - Early Return sebelum semua hooks
```typescript
// ❌ SALAH - Early return sebelum Provider
if (isLoading && !isPublicRoute) {
  return <LoadingSpinner fullScreen text="Memuat..." />;
}

return (
  <AuthContext.Provider value={{...}}>
    {children}
  </AuthContext.Provider>
);
```

**Problem**: Early return membuat jumlah hooks berbeda antar render karena `<AuthContext.Provider>` tidak selalu di-render.

### 2. **Root Page** - Menggunakan `redirect()` di Client Component
```typescript
// ❌ SALAH - redirect() tidak boleh di component body
export default function RootPage() {
  redirect('/login');
}
```

**Problem**: `redirect()` di Next.js 16 hanya bisa dipanggil di Server Components atau Server Actions, bukan di Client Component.

## ✅ Solusi yang Diterapkan

### 1. Fix AuthProvider
**File**: `providers/auth-provider.tsx`

```typescript
// ✅ BENAR - Conditional rendering di dalam Provider
const contextValue = {
  user,
  isLoading,
  isAuthenticated: !!user,
  login,
  register,
  logout,
  refreshUser,
};

return (
  <AuthContext.Provider value={contextValue}>
    {isLoading && !isPublicRoute ? (
      <LoadingSpinner fullScreen text="Memuat..." />
    ) : (
      children
    )}
  </AuthContext.Provider>
);
```

**Perubahan**:
- ✅ Tidak ada early return
- ✅ Semua hooks selalu dipanggil dalam urutan yang sama
- ✅ Conditional rendering hanya untuk children, bukan untuk Provider

### 2. Fix Root Page
**File**: `app/page.tsx`

```typescript
// ✅ BENAR - Gunakan useRouter + useEffect
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, [router]);

  return <LoadingSpinner fullScreen text="Mengarahkan..." />;
}
```

**Perubahan**:
- ✅ Convert ke Client Component dengan `'use client'`
- ✅ Gunakan `useRouter()` + `useEffect()` untuk navigation
- ✅ Render loading state saat redirect

### 3. Optimize QueryProvider
**File**: `providers/query-provider.tsx`

```typescript
// ✅ BENAR - Gunakan useMemo daripada useState
export function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
    []
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

**Perubahan**:
- ✅ `useMemo` lebih appropriate untuk object creation
- ✅ Dependency array kosong memastikan hanya dibuat sekali

## 📋 Rules of Hooks (React)

Untuk menghindari error serupa di masa depan, ikuti aturan ini:

### ✅ DO:
1. **Panggil hooks di top level** - Jangan di dalam loops, conditions, atau nested functions
2. **Panggil hooks dalam urutan yang sama** - Setiap render harus memanggil hooks dalam urutan yang konsisten
3. **Gunakan conditional rendering di JSX** - Bukan dengan early return sebelum hooks
4. **Client Component untuk hooks** - Tandai dengan `'use client'` jika menggunakan hooks Next.js

### ❌ DON'T:
1. **Jangan early return sebelum semua hooks** - Akan menyebabkan hooks mismatch
2. **Jangan panggil hooks di conditions** - `if (condition) { useEffect(...) }` ❌
3. **Jangan gunakan `redirect()` di Client Component body** - Gunakan `useRouter()` + `useEffect()`
4. **Jangan nested hooks** - Hooks harus di component function, bukan di callback

## 🧪 Testing

Setelah fix, test dengan:

```bash
# 1. Clean cache
rm -rf .next

# 2. Run dev server
npm run dev

# 3. Test build
npm run build
```

**Expected Results**:
- ✅ No hooks errors in console
- ✅ Build succeeds without warnings
- ✅ Navigation works correctly
- ✅ Auth flow works (login/logout)

## 📚 Resources

- [React Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)
- [Next.js redirect() API](https://nextjs.org/docs/app/api-reference/functions/redirect)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

## ✅ Status

- [x] AuthProvider fixed
- [x] Root page fixed
- [x] QueryProvider optimized
- [x] Build successful
- [x] Dev server runs without errors

---

**Fixed by**: AI Assistant  
**Date**: November 24, 2025  
**Build Status**: ✅ SUCCESS
