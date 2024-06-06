import { Transaction } from '@prisma/client';

export interface GetTransactionsResponseDto extends Array<Transaction> {
  creditor: {
    name: string;
  }[];
}
