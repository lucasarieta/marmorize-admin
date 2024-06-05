'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Input } from '../ui/input';

const schema = z.object({
  target: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function () {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const form = useForm({
    resolver: zodResolver(schema),
  });

  function handleFilter(data: FormData) {
    const target = data.target?.toString();

    const params = new URLSearchParams(searchParams);
    if (target) {
      params.set('target', target);
    } else {
      params.delete('target');
    }

    params.set('page', '1');

    router.push(pathname + '?' + params.toString());

    console.log(target);
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleFilter)}
      className='flex flex-1 items-center gap-2'
    >
      <Input
        placeholder='Pesquise por nome, cpf ou cnpj'
        className='h-10'
        {...form.register('target')}
      />
    </form>
  );
}
