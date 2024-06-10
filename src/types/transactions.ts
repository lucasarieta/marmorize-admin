import { Transaction } from '@prisma/client';

export interface GetTransactionsResponseDto extends Array<Transaction> {
  creditor: {
    name: string;
  }[];
}

export type TransactionTableRowProps = Array<
  Transaction & {
    creditor: {
      name: string;
    };
  }
>;
