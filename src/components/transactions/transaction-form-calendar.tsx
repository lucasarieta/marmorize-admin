import { cn } from '@/lib/utils';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
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
  field: any;
  form: UseFormReturn<CreateTransactionFormDto>;
}

export default function TransactionFormCalendar({ field, form }: Props) {
  return (
    <FormField
      control={form.control}
      name={field.key}
      render={({ field: formField }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{field.title}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full pl-3 text-left font-normal',
                    !formField.value && 'text-muted-foreground'
                  )}
                >
                  {formField.value ? (
                    format(formField.value, 'PPP', {
                      locale: ptBR,
                    })
                  ) : (
                    <span>Escolha uma data</span>
                  )}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                mode='single'
                selected={formField.value}
                onSelect={formField.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
