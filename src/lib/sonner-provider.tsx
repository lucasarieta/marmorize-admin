'use client';

import { Toaster } from 'sonner';

export function SonnerProvider({ children }: any) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
