'use client';

import { getTransactions } from '@/actions/transactions/get-transactions';
import CreateTransaction from '@/components/transactions/create-transaction';
import TransactionDayMetrics from '@/components/transactions/transaction-day-metrics';
import TransactionTable from '@/components/transactions/transaction-table';
import TransactionTableFilter from '@/components/transactions/transaction-table-filter';
import { Button } from '@/components/ui/button';
import {
  getDateRange,
  getDaysBetweenDates,
  getDaysInString,
  isDayWeekend,
} from '@/lib/days';
import { DateRange } from '@/types/date';
import { TransactionTableRowProps } from '@/types/transactions';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Page() {
  const [filterRange, setFilterRange] = useState<DateRange>(getDateRange(7));
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);

  const days = useMemo(() => {
    return getDaysBetweenDates(filterRange.from, filterRange.to);
  }, [filterRange]);

  const { data, isFetching } = useQuery({
    queryKey: ['transactions:list', filterRange],
    queryFn: () => getTransactions({ days }),
  });

  function handleNewTransaction() {
    setIsCreatingTransaction(true);
  }

  function onDateFilterChange(values: DateRange) {
    setFilterRange(values);
  }

  return (
    <div className='flex flex-col gap-4'>
      <header className='flex items-center gap-2'>
        <h1 className='text-2xl font-semibold'>Transações</h1>
        {isFetching && <Loader2Icon className='h-6 w-6 animate-spin' />}
      </header>

      <main className='space-y-2.5'>
        <div className='flex items-center gap-2'>
          <TransactionTableFilter
            filterRange={filterRange}
            onDateFilterChange={onDateFilterChange}
          />
          <Button className='ml-auto' onClick={handleNewTransaction}>
            Nova transação
          </Button>
        </div>

        <Weekdays range={filterRange} transactions={data?.transactions} />
      </main>

      <CreateTransaction
        open={isCreatingTransaction}
        onOpenChange={(open) => setIsCreatingTransaction(open)}
      />
    </div>
  );
}

function Weekdays({
  range,
  transactions,
}: {
  range: DateRange;
  transactions: TransactionTableRowProps;
}) {
  const days = getDaysBetweenDates(range.from, range.to);
  const weekDays = getDaysInString(days);

  return (
    <>
      {weekDays.map((day) => {
        const dayTransactions = transactions?.filter((transaction) => {
          const payAtDay = transaction.payAt.toISOString().split('T')[0];
          const currentDay = day.currentDate.toISOString().split('T')[0];

          return payAtDay === currentDay;
        });

        const isWeekend = isDayWeekend(day.currentDate);
        const isToday =
          new Date().toISOString().split('T')[0] ===
          day.currentDate.toISOString().split('T')[0];

        return (
          <div className='flex flex-col gap-2' key={day.currentDate.toString()}>
            <div
              className={twMerge(
                'flex items-center gap-2  p-4 rounded-md ',
                'bg-zinc-100 border border-zinc-200',
                isWeekend && 'opacity-50'
              )}
            >
              <h1>{day.text}</h1>

              {isToday && (
                <span className='text-sm py-0.5 px-3 bg-green-600/20 text-green-700 rounded-full'>
                  Hoje
                </span>
              )}

              {isWeekend && (
                <span className='text-sm py-0.5 px-3 bg-yellow-600/20 text-yellow-700 rounded-full'>
                  Fim de Semana
                </span>
              )}
            </div>

            {dayTransactions && dayTransactions.length > 0 && (
              <TransactionTable
                transactions={dayTransactions}
                date={day.currentDate}
              />
            )}

            {dayTransactions && dayTransactions.length > 0 && (
              <TransactionDayMetrics transactions={dayTransactions} />
            )}
          </div>
        );
      })}
    </>
  );
}
