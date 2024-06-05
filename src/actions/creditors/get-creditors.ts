'use server';

import prisma from '@/lib/prisma';

interface GetCreditorsDto {
  pageIndex: number;
  target?: string;
}

export async function getCreditors({ pageIndex, target }: GetCreditorsDto) {
  const creditors = await prisma.creditor.findMany({
    where: {
      AND: target
        ? [
            {
              OR: [
                { name: { contains: target, mode: 'insensitive' } },
                { document: { contains: target, mode: 'insensitive' } },
              ],
            },
          ]
        : undefined,
    },
    orderBy: {
      id: 'asc',
    },
    skip: pageIndex * 10,
    take: 8,
  });

  const creditorsCount = await prisma.creditor.count({
    where: {
      AND: target
        ? [
            {
              OR: [
                { name: { contains: target, mode: 'insensitive' } },
                { document: { contains: target, mode: 'insensitive' } },
              ],
            },
          ]
        : undefined,
    },
  });

  return {
    creditors,
    meta: {
      pageIndex,
      totalCount: creditorsCount,
      perPage: 8,
    },
  };
}
