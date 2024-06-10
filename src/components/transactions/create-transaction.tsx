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

type CreateTransactionFormDto = z.infer<typeof schema>;

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
      <SheetContent>
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
            <h1>Form</h1>

            <div className='flex flex-col gap-4 w-full'>
              {/* <FormInput
                field={{
                  key: 'amount',
                  type: 'number',
                  title: 'Valor',
                  description: 'Valor da transação',
                  placeholder: 'Valor da transação',
                }}
                form={form}
              /> */}
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
