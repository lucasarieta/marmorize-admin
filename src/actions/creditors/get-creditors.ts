'use server';

import prisma from '@/lib/prisma';
import { Creditor } from '@prisma/client';

interface GetCreditorsDto {
  pageIndex: number;
  target?: string;
}

export interface GetCreditorsResponseDto {
  creditors: Creditor[];
  meta: {
    pageIndex: number;
    totalCount: number;
    perPage: number;
  };
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
