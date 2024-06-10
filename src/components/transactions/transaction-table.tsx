import { TransactionTableRowProps } from '@/types/transactions';
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
  transactions?: TransactionTableRowProps;
  date: Date;
}

export default function TransactionTable({ date, transactions }: Props) {
  return (
    <div>
      <div className='rounded-md border select-none'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[140px]'>Nome do Credor</TableHead>
              <TableHead className='w-[140px]'>Valor</TableHead>
              <TableHead className='w-[140px]'>Status</TableHead>
              <TableHead className='w-[140px]'>Data de Vencimento</TableHead>
              <TableHead className='w-[40px]'>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!transactions && <TransactionsTableSkeleton />}

            {transactions &&
              transactions.map((transaction) => (
                <TransactionTableRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}

            {transactions && transactions.length === 0 && (
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
    </div>
  );
}
