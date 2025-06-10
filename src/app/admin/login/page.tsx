'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLoginForm, useAdminAuth } from '@/components/admin/AdminAuth';

export default function AdminLoginPage() {
  const { user, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/admin');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to admin dashboard
  }

  return <AdminLoginForm />;
}
