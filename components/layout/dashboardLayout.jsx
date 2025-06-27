'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import Sidebar from './Sidebar';

export default function DashboardLayout({ children, requiredRole }) {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      // Redirect to appropriate dashboard
      if (user?.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (user?.role === 'team_captain') {
        router.push('/captain/dashboard');
      }
    }
  }, [isAuthenticated, user, requiredRole, router]);

  if (!isAuthenticated || (requiredRole && user?.role !== requiredRole)) {
    return (
      <div className=" flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}