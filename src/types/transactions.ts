import { Transaction } from '@prisma/client';

export interface GetTransactionsResponseDto extends Array<Transaction> {
  creditor: {
    name: string;
  }[];
}

export type TransactionTableRowProps = Array<TransactionWithCreditor>;

export type TransactionWithCreditor = Transaction & {
  creditor: {
    id: string;
    name: string;
  };
};
