import { Transaction } from '@prisma/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import TransactionTableRow from './transaction-table-row';
import TransactionsTableSkeleton from './transactions-table-skeleton';

interface Props {
  result?: Transaction[];
  date: Date;
}

export default function TransactionTable({ date, result }: Props) {
  const noResults = result?.length === 0;
  return (
    <div>
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
            {!result && <TransactionsTableSkeleton />}

            {result &&
              result.map((transaction) => (
                <TransactionTableRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}

            {result && result.length === 0 && (
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

      {/* {result.map((transaction) => (
        <div key={transaction.id}>
          <div className='flex items-center gap-2'>
            <div className='text-sm font-semibold'>{transaction.id}</div>
            <div className='text-sm'>{transaction.amount}</div>
          </div>
          <div className='text-xs text-gray-500'>{transaction.operation}</div>
        </div>
      ))} */}
    </div>
  );
}
