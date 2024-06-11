'use server';

import { CreateTransactionFormDto } from '@/components/transactions/create-transaction';
import { isDayWeekend } from '@/lib/days';
import prisma from '@/lib/prisma';

export async function createTransaction(payload: CreateTransactionFormDto) {
  let payAt = payload.expiresAt;

  while (isDayWeekend(payAt)) {
    payAt = new Date(payAt.getTime() + 24 * 60 * 60 * 1000);
  }

  const response = await prisma.transaction.create({
    data: {
      creditorId: payload.creditorId,
      operation: payload.operation,
      transactionType: payload.transactionType,
      expiresAt: payload.expiresAt,
      text: payload.text,
      payAt,
      amount: payload.amount,
      status: 'PENDING',
    },
  });

  return response;
}
