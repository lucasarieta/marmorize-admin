'use client';

import { getMetrics } from '@/actions/metrics/get-metrics';
import MetricCard from '@/components/dashboard/metric-card';
import { useQuery } from '@tanstack/react-query';
import { DollarSign } from 'lucide-react';

export default function Page() {
  const { data, isFetching } = useQuery({
    queryKey: ['metrics'],
    queryFn: () => getMetrics(),
  });

  return (
    <main className='flex flex-col gap-4'>
      <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <MetricCard
          title='Gastos'
          icon={DollarSign}
          amount={data?.spends.amount}
          description='Lorem Ipsum'
        />

        <MetricCard
          title='Recebimentos'
          icon={DollarSign}
          amount={data?.receipts.amount}
          description='Lorem Ipsum'
        />

        <MetricCard
          title='Transações'
          icon={DollarSign}
          amount={data?.transactions.amount}
          description='Lorem Ipsum'
        />
      </section>
    </main>
  );
}
