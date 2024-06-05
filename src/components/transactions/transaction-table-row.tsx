'use client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Transaction } from '@prisma/client';
import { useRouter } from 'next/navigation';

export interface Props {
  transaction: Transaction;
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
          {transaction.id}
        </TableCell>

        <TableCell className='max-w-[160px] truncate'>
          {transaction.amount}
        </TableCell>

        <TableCell className='max-w-[140px] truncate'>
          {transaction.operation}
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
