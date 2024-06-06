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

  const greatherThan = new Date(`${firstWeekDay}T00:00:00Z`);
  const lessThan = new Date(`${lastWeekDay}T23:59:59Z`);
  console.log(daysInAWeek, firstWeekDay, lastWeekDay, greatherThan, lessThan);

  const transactions = await prisma.transaction.findMany({
    where: {
      payAt: {
        gte: greatherThan, // First day of the week
        lte: lessThan, // Last day of the week
      },
    },
    include: {
      creditor: true,
    },
  });

  console.log(transactions);

  return {
    transactions,
    meta: {},
  };
}
