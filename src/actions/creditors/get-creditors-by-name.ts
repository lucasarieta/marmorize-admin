'use server';

import prisma from '@/lib/prisma';

export async function getCreditorsByName(name: string) {
  const response = await prisma.creditor.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });

  return response ?? [];
}
