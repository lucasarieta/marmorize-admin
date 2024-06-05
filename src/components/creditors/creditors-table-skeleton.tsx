'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

export default function () {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        return (
          <TableRow key={i}>
            <TableCell className='font-mono text-xs font-medium'>
              <Skeleton className='h-6 w-[140px]' />
            </TableCell>

            <TableCell>
              <Skeleton className='h-4 w-[200px]' />
            </TableCell>

            <TableCell className='font-medium'>
              <Skeleton className='h-4 w-[140px]' />
            </TableCell>

            <TableCell>
              <Skeleton className='h-4 w-[140px]' />
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
