'use server';

import prisma from '@/lib/prisma';

export async function deleteTransaction(transactionId: string) {
  const response = await prisma.transaction.delete({
    where: {
      id: transactionId,
    },
  });

  return response;
}
