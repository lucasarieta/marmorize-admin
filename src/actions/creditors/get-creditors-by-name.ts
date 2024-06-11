'use server';

import prisma from '@/lib/prisma';

export async function getCreditorsByName(name: string) {
  console.log('getCreditorsByName', name);
  if (!name || name?.length === 0) {
    return await prisma.creditor.findMany({
      take: 5,
      orderBy: {
        id: 'desc',
      },
    });
  }

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
