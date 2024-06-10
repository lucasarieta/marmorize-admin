import { TransactionTableRowProps } from '@/types/transactions';
import { twMerge } from 'tailwind-merge';

interface Props {
  transactions?: TransactionTableRowProps;
}

export default function TransactionDayMetrics({ transactions }: Props) {
  const totalSpent = transactions?.reduce((acc, transaction) => {
    if (transaction.operation === 'DEBIT') {
      return acc + transaction.amount;
    }

    return acc;
  }, 0);

  const totalReceived = transactions?.reduce((acc, transaction) => {
    if (transaction.operation === 'CREDIT') {
      return acc + transaction.amount;
    }

    return acc;
  }, 0);

  const totalAmount = totalReceived - totalSpent;

  return (
    <div className='flex flex-col items-center gap-2 w-full border border-zinc-200 rounded-md'>
      <div className='flex justify-between items-center w-full border-b border-zinc-200 p-2'>
        <h1>Métricas do dia</h1>
      </div>

      <div className='flex justify-between items-center w-full border-b border-zinc-200 p-2'>
        <h1>Entrada</h1>
        <span>+{totalReceived}</span>
      </div>

      <div className='flex justify-between items-center w-full border-b border-zinc-200 p-2'>
        <h1>Saída</h1>
        <span>-{totalSpent}</span>
      </div>

      <div className='flex justify-between items-center w-full p-2'>
        <h1>Total</h1>
        <span
          className={twMerge(
            totalAmount > 0 &&
              'bg-green-600/20 py-0.5 px-2 rounded-full text-green-700',
            totalAmount < 0 &&
              'bg-red-600/20 py-0.5 px-2 rounded-full text-red-700'
          )}
        >
          {totalAmount > 0 ? '+' : ''}
          {totalAmount}
        </span>
      </div>
    </div>
  );
}
