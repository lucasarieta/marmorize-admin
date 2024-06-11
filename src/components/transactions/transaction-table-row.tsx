'use client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/days';
import { TransactionWithCreditor } from '@/types/transactions';
import { CogIcon, TrashIcon } from '@heroicons/react/24/outline';
import { TransactionStatus } from '@prisma/client';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import EditTransaction from './edit-transaction';
import TransactionDeletePopup from './transaction-delete-popup';

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
  const [isEditing, setIsEditing] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleDelete() {
    setShowDeletePopup(true);
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
            R${transaction.amount}
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
          <Button variant='secondary' onClick={handleEdit} size='sm'>
            <CogIcon className='w-5 h-5' />
          </Button>

          <Button variant='destructive' onClick={handleDelete} size='sm'>
            <TrashIcon className='w-5 h-5' />
          </Button>
        </TableCell>
      </TableRow>

      <EditTransaction
        open={isEditing}
        onOpenChange={setIsEditing}
        transaction={transaction}
      />

      <TransactionDeletePopup
        open={showDeletePopup}
        onOpenChange={setShowDeletePopup}
        transactionId={transaction.id}
      />
    </>
  );
}
