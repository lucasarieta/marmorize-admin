'use client';

import { getCreditorsByName } from '@/actions/creditors/get-creditors-by-name';
import useDebounce from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown, LoaderIcon } from 'lucide-react';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CreateTransactionFormDto } from './create-transaction';

interface Props {
  form: UseFormReturn<CreateTransactionFormDto>;
}

export default function TransactionFormCreditor({ form }: Props) {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 300);

  const { data, isFetching } = useQuery({
    queryKey: ['creditors', debouncedSearchText],
    queryFn: () => getCreditorsByName(debouncedSearchText.toLowerCase()),
    staleTime: Infinity,
  });

  function onSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
    form.setValue('creditorId', null);
  }

  return (
    <FormField
      control={form.control}
      name='creditorId'
      render={({ field }) => (
        <FormItem className='flex flex-col gap-2'>
          <FormLabel>Credor</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <button
                  role='combobox'
                  className={cn(
                    'w-full flex items-center justify-between h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value && data?.length > 0
                    ? data?.find((creditor) => creditor.id === field.value)
                        ?.name
                    : 'Nome do credor...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput
                  value={searchText}
                  onChange={onSearchTextChange}
                  placeholder='Nome do credor...'
                />
                {isFetching ? (
                  <CommandEmpty className='full-center gap-2 m-4'>
                    <LoaderIcon className='h-4 w-4 animate-spin' />
                  </CommandEmpty>
                ) : (
                  <CommandEmpty>Sem resultados</CommandEmpty>
                )}
                <CommandGroup>
                  <CommandList>
                    {data?.map((creditor) => (
                      <CommandItem
                        value={creditor.id}
                        key={creditor.id}
                        onSelect={() => {
                          form.setValue('creditorId', creditor.id);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            creditor.id === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {creditor.name}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
