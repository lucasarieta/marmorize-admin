import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ManageCreditorFormDto } from './creditors-manage-form';

interface Props {
  field: any;
  form: UseFormReturn<ManageCreditorFormDto>;
}

export default function CreditorsFormInput({ field, form }: Props) {
  return (
    <FormField
      key={field.key}
      control={form.control}
      name={field.key}
      render={() => (
        <FormItem className='flex items-center gap-16 w-full'>
          <div className='w-48'>
            <FormLabel>{field.title}</FormLabel>
            {field.description && (
              <FormDescription className='text-xs'>
                {field.description}
              </FormDescription>
            )}
          </div>

          <div className='flex-1'>
            <FormControl>
              <Input
                placeholder={field.placeholder}
                {...form.register(field.key)}
              />
            </FormControl>

            <FormMessage className='text-xs' />
          </div>
        </FormItem>
      )}
    />
  );
}
