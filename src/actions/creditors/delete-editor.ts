'use server';

import prisma from '@/lib/prisma';

export async function deleteCreditor(id: string) {
  await prisma.creditor.delete({
    where: {
      id,
    },
  });
}
