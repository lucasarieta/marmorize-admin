'use client';

import { getCreditors } from '@/actions/creditors/get-creditors';
import CreditorsTableFilter from '@/components/creditors/creditors-table-filter';
import CreditorsTableRow from '@/components/creditors/creditors-table-row';
import CreditorsTableSkeleton from '@/components/creditors/creditors-table-skeleton';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const target = searchParams.get('target');

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1');

  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['creditors', target, pageIndex],
    queryFn: () => getCreditors({ pageIndex, target }),
  });

  function handlePaginate(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    params.delete('target');

    router.push(pathname + '?' + params.toString());
  }

  return (
    <div className='flex flex-col gap-4'>
      <header className='flex items-center gap-2'>
        <h1 className='text-2xl font-semibold'>Credores</h1>
        {isFetching && <Loader2Icon className='h-6 w-6 animate-spin' />}
      </header>

      <main className='space-y-2.5'>
        <div className='flex items-center gap-2'>
          <CreditorsTableFilter />
          <Button>Novo Credor</Button>
        </div>

        <div className='rounded-md border select-none'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[140px]'>Nome</TableHead>
                <TableHead className='w-[140px]'>Documento</TableHead>
                <TableHead className='w-[140px]'>Tipo</TableHead>
                <TableHead className='w-[50px]'>Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && !result && <CreditorsTableSkeleton />}

              {result &&
                result.creditors.map((creditor) => (
                  <CreditorsTableRow key={creditor.id} creditor={creditor} />
                ))}

              {result && result.creditors.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className='py-10 text-center text-muted-foreground'
                  >
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {result && (
          <Pagination
            pageIndex={pageIndex}
            totalCount={result.meta.totalCount}
            perPage={result.meta.perPage}
            onPageChange={handlePaginate}
          />
        )}
      </main>
    </div>
  );
}
