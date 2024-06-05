import Sidebar from '@/components/sidebar';
import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative flex h-screen overflow-hidden'>
      <Sidebar />
      <main className='w-full p-4 overflow-y-scroll'>
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
}
