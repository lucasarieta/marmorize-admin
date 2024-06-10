import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { CreateTransactionFormDto } from './create-transaction';

interface Props {
  field: any;
  form: UseFormReturn<CreateTransactionFormDto>;
}

export default function TransactionFormInput({ field, form }: Props) {
  return (
    <FormField
      key={field.key}
      control={form.control}
      name={field.key}
      render={() => (
        <FormItem className='flex items-center gap-16 w-full'>
          <FormLabel>{field.title}</FormLabel>

          <FormControl>
            <Input
              placeholder={field.placeholder}
              {...form.register(field.key)}
            />
          </FormControl>

          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
