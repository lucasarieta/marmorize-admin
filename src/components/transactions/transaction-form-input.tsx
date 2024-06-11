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
        <FormItem className='flex flex-col gap-2 w-full'>
          <FormLabel>{field.title}</FormLabel>
          <FormControl>
            <>
              {field.type === 'text' && (
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  {...form.register(field.key)}
                />
              )}

              {field.type === 'number' && (
                <Input
                  type={'text'}
                  placeholder={field.placeholder}
                  {...form.register(field.key, { valueAsNumber: true })}
                />
              )}
            </>
          </FormControl>

          <FormMessage className='text-xs' />
        </FormItem>
      )}
    />
  );
}
