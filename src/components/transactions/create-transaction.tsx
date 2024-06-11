import { createTransaction } from '@/actions/transactions/create-transaction';
import { queryClient } from '@/lib/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogProps } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import { Textarea } from '../ui/textarea';
import TransactionFormCalendar from './transaction-form-calendar';
import TransactionFormCreditor from './transaction-form-creditor';
import TransactionFormInput from './transaction-form-input';
import TransactionFormSelect from './transaction-form-select';

const schema = z.object({
  creditorId: z.string({ required_error: 'O credor é obrigatório' }),
  amount: z
    .number({
      required_error: 'O valor é obrigatório',
      invalid_type_error: 'O valor deve ser um número',
    })
    .min(1, { message: 'O valor deve ser maior que R$ 1,00' }),
  operation: z.enum(['CREDIT', 'DEBIT'], {
    required_error: 'O operação é obrigatório',
  }),
  transactionType: z.string().default('Boleto'),
  expiresAt: z.date({ required_error: 'O prazo de vencimento é obrigatório' }),
  text: z.string().optional(),
});

export type CreateTransactionFormDto = z.infer<typeof schema>;

interface Props extends DialogProps {}

export default function CreateTransaction({ ...props }: Props) {
  const form = useForm<CreateTransactionFormDto>({
    resolver: zodResolver(schema),
    values: {
      amount: 0,
      operation: 'CREDIT',
      transactionType: 'Boleto',
    },
  });

  async function submit(payload: CreateTransactionFormDto) {
    try {
      await createTransaction(payload);
      handleUpdateTransactions();
      props.onOpenChange(false);
      form.reset();

      toast.success('Transação criada com sucesso');
    } catch (error) {
      toast.error('Erro ao criar transação');
    }
  }

  function handleUpdateTransactions() {
    queryClient.invalidateQueries({
      queryKey: ['transactions:list'],
    });
  }

  return (
    <Sheet {...props}>
      <SheetContent className='flex flex-col gap-4'>
        <SheetHeader>
          <SheetTitle>Criar transação</SheetTitle>
          <SheetDescription>
            Registre uma nova transação no seu registro de transações.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col gap-4 w-full'>
              <TransactionFormCreditor form={form} />

              <TransactionFormInput
                field={{
                  key: 'amount',
                  type: 'number',
                  title: 'Valor',
                  placeholder: 'Digite o valor da transação',
                }}
                form={form}
              />

              <TransactionFormInput
                field={{
                  key: 'transactionType',
                  type: 'text',
                  title: 'Tipo de transação',
                  placeholder: 'Digite o tipo da transação',
                }}
                form={form}
              />

              <TransactionFormSelect
                field={{
                  key: 'operation',
                  title: 'Operação',
                  placeholder: 'Selecione a operação',
                  options: [
                    {
                      value: 'CREDIT',
                      label: 'Ganho',
                    },
                    {
                      value: 'DEBIT',
                      label: 'Gasto',
                    },
                  ],
                }}
                form={form}
              />

              <TransactionFormCalendar
                field={{
                  key: 'expiresAt',
                  title: 'Data de vencimento',
                  placeholder: 'Selecione a data de vencimento',
                }}
                form={form}
              />

              <FormField
                control={form.control}
                name='text'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Adicione observações sobre a transação'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='text-xs' />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>Criar nova transação</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
