import { Transaction } from '@prisma/client';
import { twMerge } from 'tailwind-merge';

interface Props {
  result?: Array<
    Transaction & {
      creditor: {
        name: string;
      };
    }
  >;
}

export default function TransactionDayMetrics({ result }: Props) {
  console.log('asd', result);
  const totalSpent = result?.reduce((acc, r) => {
    if (r.operation === 'DEBIT') {
      return acc + r.amount;
    }

    return acc;
  }, 0);

  const totalReceived = result?.reduce((acc, r) => {
    if (r.operation === 'CREDIT') {
      return acc + r.amount;
    }

    return acc;
  }, 0);

  const totalAmount = totalSpent + totalReceived;

  return (
    <div className='flex flex-col items-center gap-2 w-full border border-zinc-200 rounded-md'>
      <div className='flex justify-between items-center w-full border-b border-zinc-200 p-2'>
        <h1>Total Recebido</h1>
        <span>{totalReceived}</span>
      </div>

      <div className='flex justify-between items-center w-full border-b border-zinc-200 p-2'>
        <h1>Total Gasto</h1>
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
