'use server';

import prisma from '@/lib/prisma';
import { Transaction } from '@prisma/client';
import { endOfMonth, startOfMonth, subMonths } from 'date-fns';

export async function getMetrics() {
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now);
  const endOfCurrentMonth = endOfMonth(now);
  const startOfLastMonth = startOfMonth(subMonths(now, 1));
  const endOfLastMonth = endOfMonth(subMonths(now, 1));

  const transactionsCurrentMonth = await prisma.transaction.findMany({
    where: {
      createdAt: {
        gte: startOfCurrentMonth,
        lte: endOfCurrentMonth,
      },
    },
  });

  const transactionsLastMonth = await prisma.transaction.findMany({
    where: {
      createdAt: {
        gte: startOfLastMonth,
        lte: endOfLastMonth,
      },
    },
  });

  const spendsCurrentMonth = generateMoneyMetric(
    transactionsCurrentMonth,
    transactionsLastMonth,
    'CREDIT'
  );

  const receiptsCurrentMonth = generateMoneyMetric(
    transactionsCurrentMonth,
    transactionsLastMonth,
    'DEBIT'
  );

  return {
    spends: {
      amount: spendsCurrentMonth.amount,
      compareTo: spendsCurrentMonth.compareTo,
    },
    receipts: {
      amount: receiptsCurrentMonth.amount,
      compareTo: receiptsCurrentMonth.compareTo,
    },
    transactions: {
      amount: transactionsCurrentMonth.length,
      compareTo: transactionsLastMonth.length,
    },
  };
}

function generateMoneyMetric(
  current: Transaction[],
  last: Transaction[],
  operation: string
) {
  const currentMoney = current.reduce(
    (acc, transaction) => {
      if (transaction.operation === operation) {
        acc.amount += transaction.amount;
      }

      return acc;
    },
    { amount: 0 }
  );

  const lastMoney = last.reduce(
    (acc, transaction) => {
      if (transaction.operation === operation) {
        acc.amount += transaction.amount;
      }

      return acc;
    },
    { amount: 0 }
  );

  return {
    amount: currentMoney.amount,
    compareTo: lastMoney.amount,
  };
}
