import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { CreateTransactionFormDto } from './create-transaction';

interface Props {
  field: any;
  form: UseFormReturn<CreateTransactionFormDto>;
}

export default function TransactionFormSelect({ field, form }: Props) {
  return (
    <FormField
      key={field.key}
      control={form.control}
      name={field.key}
      render={() => (
        <FormField
          key={field.key}
          control={form.control}
          name={field.key}
          render={({ field: formField }) => (
            <FormItem className='flex flex-col gap-2'>
              <FormLabel>{field.title}</FormLabel>

              <div className='flex-1'>
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options.map((option) => (
                      <SelectItem key={option.label} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <FormMessage className='text-xs' />
            </FormItem>
          )}
        />
      )}
    />
  );
}
