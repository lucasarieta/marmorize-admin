'use server';

import prisma from '@/lib/prisma';

export async function getCreditor(id: string) {
  const creditor = await prisma.creditor.findUnique({
    where: {
      id,
    },
  });

  return creditor;
}
