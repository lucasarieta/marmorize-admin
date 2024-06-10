'use client';

import { getCreditorsByName } from '@/actions/creditors/get-creditors-by-name';
import useDebounce from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Check, ChevronsUpDown, LoaderIcon } from 'lucide-react';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
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
    enabled: !!debouncedSearchText,
    staleTime: Infinity,
  });

  function onSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  return (
    <FormField
      control={form.control}
      name='creditorId'
      render={({ field }) => (
        <FormItem className='flex items-center justify-between'>
          <FormLabel className='w-40'>Credor</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className={cn(
                    'w-full',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value
                    ? data?.find((creditor) => creditor.id === field.value)
                        ?.name
                    : 'Nome do credor...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
