'use server';

import { EditTransactionFormDto } from '@/components/transactions/edit-transaction';
import prisma from '@/lib/prisma';

interface UpdateTransactionDto extends EditTransactionFormDto {
  id: string;
}

export async function updateTransaction(payload: UpdateTransactionDto) {
  const response = await prisma.transaction.update({
    where: {
      id: payload.id,
    },
    data: {
      creditorId: payload.creditorId,
      operation: payload.operation,
      transactionType: payload.transactionType,
      expiresAt: payload.expiresAt,
      text: payload.text,
      payAt: payload.payAt,
      amount: payload.amount,
      status: payload.status,
    },
  });

  return response;
}
