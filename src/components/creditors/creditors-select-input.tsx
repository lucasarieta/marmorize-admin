import { ManageCreditorFormDto } from '@/app/app/creditors/manage/page';
import {
  FormControl,
  FormDescription,
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

interface Props {
  field: any;
  form: UseFormReturn<ManageCreditorFormDto>;
}

export default function ({ field, form }: Props) {
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
            <FormItem className='flex items-center gap-16'>
              <div className='w-48'>
                <FormLabel>{field.title}</FormLabel>
                {field.description && (
                  <FormDescription className='text-xs'>
                    {field.description}
                  </FormDescription>
                )}
              </div>

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
                <FormMessage className='text-xs' />
              </div>
            </FormItem>
          )}
        />
      )}
    />
  );
}
