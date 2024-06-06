'use client';

import { deleteCreditor } from '@/actions/creditors/delete-creditor';
import { GetCreditorsResponseDto } from '@/actions/creditors/get-creditors';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { getCreditorType } from '@/lib/creditor';
import { maskDocument } from '@/lib/document';
import { queryClient } from '@/lib/react-query';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Creditor } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import CreditorsDeletePopup from './creditors-delete-popup';

export interface Props {
  creditor: Creditor;
}

export default function CreditorsTableRow({ creditor }: Props) {
  const router = useRouter();

  const [deletePopupOpen, setDeletePopupOpen] = useState(false);

  function handleEdit() {
    router.push(`/app/creditors/manage/${creditor.id}`);
  }

  async function handleDelete() {
    setDeletePopupOpen(false);

    await deleteCreditor(creditor.id);

    const creditorsListCache =
      queryClient.getQueriesData<GetCreditorsResponseDto>({
        queryKey: ['creditors'],
      });

    creditorsListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData(cacheKey, (query: GetCreditorsResponseDto) => {
        if (!query) return;

        const creditors = query.creditors.filter(
          (_creditor) => _creditor.id !== creditor.id
        );

        return {
          ...query,
          creditors,
        };
      });
    });

    toast.success('Creditor deletado com sucesso');
  }

  return (
    <>
      <TableRow>
        <TableCell className='max-w-[140px] truncate'>
          {creditor.name}
        </TableCell>

        <TableCell className='max-w-[160px] truncate'>
          {maskDocument(creditor.document, creditor.documentType)}
        </TableCell>

        <TableCell className='max-w-[140px] truncate'>
          {getCreditorType(creditor.type)}
        </TableCell>

        <TableCell className='flex items-center gap-2'>
          <Button onClick={handleEdit} size='sm'>
            <PencilIcon className='w-4 h-4' />
          </Button>

          <Button
            variant='destructive'
            onClick={() => setDeletePopupOpen(true)}
            size='sm'
          >
            <TrashIcon className='w-4 h-4' />
          </Button>
        </TableCell>
      </TableRow>

      <CreditorsDeletePopup
        onDelete={handleDelete}
        open={deletePopupOpen}
        onOpenChange={(open) => setDeletePopupOpen(open)}
      />
    </>
  );
}
