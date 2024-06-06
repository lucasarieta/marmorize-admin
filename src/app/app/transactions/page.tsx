'use client';

import { getTransactions } from '@/actions/transactions/get-transactions';
import TransactionDayMetrics from '@/components/transactions/transaction-day-metrics';
import TransactionTable from '@/components/transactions/transaction-table';
import { getAllDaysInAWeek, getDaysInString, isDayWeekend } from '@/lib/days';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export default function Page() {
  const router = useRouter();

  const daysInAWeek = getAllDaysInAWeek();
  const weekDays = getDaysInString(daysInAWeek);

  const {
    data: result,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions({ daysInAWeek }),
  });

  function handleNewTransaction() {
    router.push('/app/transactions/manage/new');
  }

  console.log(result);

  return (
    <div className='flex flex-col gap-4'>
      <header className='flex items-center gap-2'>
        <h1 className='text-2xl font-semibold'>Transações</h1>
        {isFetching && <Loader2Icon className='h-6 w-6 animate-spin' />}
      </header>

      <main className='space-y-2.5'>
        <div className='flex items-center gap-2'>
          {/* <Button onClick={handleNewTransaction}>Nova transação</Button> */}
        </div>

        {weekDays.map((day, index) => {
          const current = result?.transactions.filter((r) => {
            const payAtDay = r.payAt.toISOString().split('T')[0];
            const currentDay = day.currentDate.toISOString().split('T')[0];

            return payAtDay === currentDay;
          });

          const isWeekend = isDayWeekend(day.currentDate);

          return (
            <div
              className='flex flex-col gap-2'
              key={day.currentDate.toString()}
            >
              <div
                className={twMerge(
                  'flex items-center gap-2  p-4 rounded-md ',
                  'bg-zinc-100 border border-zinc-200',
                  isWeekend && 'opacity-50'
                )}
              >
                <h1>{day.text}</h1>

                {index === 0 && (
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

              {current && current.length > 0 && (
                <TransactionTable result={current} date={day.currentDate} />
              )}

              {current && current.length > 0 && (
                <TransactionDayMetrics result={current} />
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
