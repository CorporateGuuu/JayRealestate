import { AdminAuthProvider } from '@/components/admin/AdminAuth';

export const metadata = {
  title: 'Admin Dashboard - JAY Real Estate',
  description: 'JAY Real Estate admin dashboard for lead management and analytics',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      {children}
    </AdminAuthProvider>
  );
}
