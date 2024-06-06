'use client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/days';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Transaction, TransactionStatus } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

type TransactionWithCreditor = Transaction & {
  creditor: {
    name: string;
  };
};

export interface Props {
  transaction: TransactionWithCreditor;
}

function castStatus(status: TransactionStatus) {
  switch (status) {
    case 'PENDING':
      return 'Pendente';
    case 'PAID':
      return 'Pago';
    default:
      return 'Não paga';
  }
}

export default function TransactionTableRow({ transaction }: Props) {
  const router = useRouter();

  function handleEdit() {
    router.push(`/app/creditors/manage/${transaction.id}`);
  }

  return (
    <>
      <TableRow>
        <TableCell className='max-w-[140px] truncate'>
          {transaction.creditor.name}
        </TableCell>

        <TableCell className='max-w-[160px] truncate'>
          <span
            className={twMerge(
              transaction.operation === 'CREDIT'
                ? 'bg-green-600/20 py-0.5 px-2 rounded-full text-green-700'
                : 'bg-red-600/20 py-0.5 px-2 rounded-full text-red-700'
            )}
          >
            {transaction.operation === 'CREDIT' ? '+' : '-'}
            {transaction.amount}
          </span>
        </TableCell>

        <TableCell className='max-w-[140px] truncate'>
          <span
            className={twMerge(
              transaction.status === 'PAID'
                ? 'bg-green-600/20 py-0.5 px-2 rounded-full text-green-700'
                : 'bg-yellow-600/20 py-0.5 px-2 rounded-full text-yellow-700'
            )}
          >
            {castStatus(transaction.status)}
          </span>
        </TableCell>

        <TableCell className='max-w-[140px] truncate'>
          {formatDate(transaction.payAt)}
        </TableCell>

        <TableCell className='flex items-center gap-2'>
          <Button onClick={handleEdit} size='sm'>
            <PencilIcon className='w-4 h-4' />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
}
