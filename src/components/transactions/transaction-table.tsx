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
  result?: Array<
    Transaction & {
      creditor: {
        name: string;
      };
    }
  >;
  date: Date;
}

export default function TransactionTable({ date, result }: Props) {
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
    </div>
  );
}
