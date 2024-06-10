'use client';

import { DateRange } from '@/types/date';
import { DateRangePicker } from '../ui/date-range-picker';

interface Props {
  filterRange: DateRange;
  onDateFilterChange: (values: DateRange) => void;
}

export default function TransactionTableFilter({
  filterRange,
  onDateFilterChange,
}: Props) {
  const from = filterRange.from?.toISOString().split('T')[0];
  const to = filterRange.to?.toISOString().split('T')[0];

  return (
    <div>
      <DateRangePicker
        onUpdate={(values) => onDateFilterChange(values.range)}
        initialDateFrom={from}
        initialDateTo={to}
        align='start'
        locale='pt-BR'
        showCompare={false}
      />
    </div>
  );
}
