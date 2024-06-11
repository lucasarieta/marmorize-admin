import { updateTransaction } from '@/actions/transactions/update-transaction';
import { queryClient } from '@/lib/react-query';
import { TransactionWithCreditor } from '@/types/transactions';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogProps } from '@radix-ui/react-dialog';
import { LoaderIcon } from 'lucide-react';
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
  status: z.enum(['PENDING', 'PAID'], {
    required_error: 'O status é obrigatório',
  }),
  expiresAt: z.date({ required_error: 'O prazo de vencimento é obrigatório' }),
  payAt: z.date({ required_error: 'O prazo de pagamento é obrigatório' }),
  text: z.string().optional(),
});

export type EditTransactionFormDto = z.infer<typeof schema>;

interface Props extends DialogProps {
  transaction: TransactionWithCreditor;
}

export default function EditTransaction({ transaction, ...props }: Props) {
  const form = useForm<EditTransactionFormDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      creditorId: transaction.creditor?.id,
      amount: transaction.amount,
      operation: transaction.operation,
      status: transaction.status,
      transactionType: transaction.transactionType,
      expiresAt: transaction.expiresAt,
      payAt: transaction.payAt,
      text: transaction.text ?? '',
    },
    reValidateMode: 'onChange',
  });

  async function submit(payload: EditTransactionFormDto) {
    try {
      await updateTransaction({ id: transaction.id, ...payload });
      handleUpdateTransactions();
      props.onOpenChange(false);

      toast.success('Transação editada com sucesso');
    } catch (error) {
      toast.error('Erro ao editar transação');
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
          <SheetTitle>Editar transação</SheetTitle>
          <SheetDescription>
            Edite a transação no seu registro de transações.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className='flex flex-col gap-4'
          >
            <div className='flex flex-col gap-4 w-full'>
              <TransactionFormCreditor
                creditorId={transaction.creditor.id}
                form={form}
              />

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
                  key: 'status',
                  title: 'Status',
                  placeholder: 'Selecione o status da transação',
                  options: [
                    {
                      value: 'PENDING',
                      label: 'Pendente',
                    },
                    {
                      value: 'PAID',
                      label: 'Pago',
                    },
                  ],
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

              <TransactionFormCalendar
                field={{
                  key: 'payAt',
                  title: 'Data de pagamento',
                  placeholder: 'Selecione a data de pagamento',
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
            <Button
              disabled={form.formState.isSubmitting}
              type='submit'
              className='flex items-center gap-2'
            >
              {form.formState.isSubmitting && (
                <LoaderIcon className='animate-spin w-4 h-4' />
              )}
              Salvar transação
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
