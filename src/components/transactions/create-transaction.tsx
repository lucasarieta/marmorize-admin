import { zodResolver } from '@hookform/resolvers/zod';
import { DialogProps } from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';
import TransactionFormCreditor from './transaction-form-creditor';
import TransactionFormInput from './transaction-form-input';

// TransactionType should be defined in the backend
const schema = z.object({
  // TODO: Creditor
  creditorId: z.string(),

  amount: z
    .number({
      required_error: 'O valor é obrigatório',
      invalid_type_error: 'O valor deve ser um número',
    })
    .min(0.01, { message: 'O valor deve ser maior que 0,01' }),
  operation: z.enum(['CREDIT', 'DEBIT'], {
    required_error: 'O operação é obrigatório',
  }),
  transactionType: z.string().default('Boleto'),
  expiresAt: z.date({ required_error: 'O prazo de vencimento é obrigatório' }),
  payAt: z.date({ required_error: 'O prazo de pagamento é obrigatório' }),
  text: z.string().optional(),
});

export type CreateTransactionFormDto = z.infer<typeof schema>;

interface Props extends DialogProps {}

export default function CreateTransaction({ ...props }: Props) {
  const form = useForm<CreateTransactionFormDto>({
    resolver: zodResolver(schema),
  });

  async function submit(payload: CreateTransactionFormDto) {
    console.log(payload);
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
                  title: 'Valor',
                  placeholder: 'Digite o valor da transação',
                }}
                form={form}
              />
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
