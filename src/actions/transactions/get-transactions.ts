'use server';

import prisma from '@/lib/prisma';

interface GetTransactionsDto {
  days: Date[];
}

export async function getTransactions({ days }: GetTransactionsDto) {
  const firstWeekDay = days[0].toISOString().split('T')[0];
  const lastWeekDay = days[days.length - 1].toISOString().split('T')[0];

  const greatherThan = new Date(`${firstWeekDay}T00:00:00Z`);
  const lessThan = new Date(`${lastWeekDay}T23:59:59Z`);

  const transactions = await prisma.transaction.findMany({
    where: {
      payAt: {
        gte: greatherThan, // First day of the week
        lte: lessThan, // Last day of the week
      },
    },
    // TODO
    orderBy: {
      id: 'desc',
    },
    include: {
      creditor: true,
    },
  });

  return {
    transactions,
    meta: {},
  };
}
