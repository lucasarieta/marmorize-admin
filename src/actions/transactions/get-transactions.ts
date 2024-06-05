'use server';

import prisma from '@/lib/prisma';

interface GetTransactionsDto {
  daysInAWeek: Date[];
}

export async function getTransactions({ daysInAWeek }: GetTransactionsDto) {
  const firstWeekDay = daysInAWeek[0].toISOString().split('T')[0];
  const lastWeekDay = daysInAWeek[daysInAWeek.length - 1]
    .toISOString()
    .split('T')[0];

  const transactions = await prisma.transaction.findMany({
    where: {
      payAt: {
        gte: new Date(`${firstWeekDay}T00:00:00Z`), // First day of the week
        lte: new Date(`${lastWeekDay}T23:59:59Z`), // Last day of the week
      },
    },
  });

  const transactionsCount = await prisma.transaction.count();

  return {
    transactions,
    meta: {},
  };
}
