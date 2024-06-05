'use client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { getCreditorType } from '@/lib/creditor';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Creditor } from '@prisma/client';
import { useRouter } from 'next/navigation';

export interface Props {
  creditor: Creditor;
}

export default function ({ creditor }: Props) {
  const router = useRouter();

  function edit() {
    router.push(`/app/creditors/manage/${creditor.id}`);
  }

  return (
    <TableRow>
      <TableCell className='max-w-[140px] truncate'>{creditor.name}</TableCell>

      <TableCell className='max-w-[160px] truncate'>
        {creditor.document}
      </TableCell>

      <TableCell className='max-w-[140px] truncate'>
        {getCreditorType(creditor.type)}
      </TableCell>

      <TableCell>
        <Button onClick={edit} size='sm'>
          <PencilIcon className='w-4 h-4' />
        </Button>
      </TableCell>
    </TableRow>
  );
}
