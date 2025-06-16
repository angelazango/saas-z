'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/services/authService';
// import LoginPage from '@/src/app/login/page';

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
}
