'use client';

import { getTransactions } from '@/actions/transactions/get-transactions';
import TransactionTable from '@/components/transactions/transaction-table';
import { Button } from '@/components/ui/button';
import { getAllDaysInAWeek, getDaysInString } from '@/lib/days';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
          <Button onClick={handleNewTransaction}>Nova transação</Button>
        </div>

        {weekDays.map((day) => {
          const dayResult = result?.transactions.filter((r) => {
            const payAtDay = r.payAt.toISOString().split('T')[0];
            const currentDay = day.currentDate.toISOString().split('T')[0];

            return payAtDay === currentDay;
          });

          return (
            <div
              className='flex flex-col gap-2'
              key={day.currentDate.toString()}
            >
              <div className='bg-zinc-100 p-4 rounded-md'>
                <h1>{day.text}</h1>
              </div>

              <TransactionTable result={dayResult} date={day.currentDate} />
            </div>
          );
        })}
      </main>
    </div>
  );
}
