'use client';

import { createCreditor } from '@/actions/creditors/create-creditor';
import { GetCreditorsResponseDto } from '@/actions/creditors/get-creditors';
import { updateCreditor } from '@/actions/creditors/update-creditor';
import { queryClient } from '@/lib/react-query';
import { ICreditor } from '@/types/creditor';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import CreditorsFormInput from './creditors-form-input';
import CreditorsSelectInput from './creditors-select-input';

const schema = z.object({
  name: z
    .string({
      required_error: 'O nome é obrigatório',
    })
    .min(2, {
      message: 'O nome deve ter no mínimo 2 caracteres',
    })
    .max(255, {
      message: 'O nome deve ter no máximo 255 caracteres',
    }),
  document: z
    .string({ required_error: 'O documento é obrigatório' })
    .min(11, { message: 'O documento deve ter no mínimo 11 caracteres' })
    .max(14, { message: 'O documento deve ter no máximo 14 caracteres' }), // TODO: refine
  type: z.enum(
    ['SUPPLIER', 'SERVICES', 'TAXES', 'EMPLOYEES', 'BANKS', 'OTHER'],
    {
      required_error: 'O tipo é obrigatório',
    }
  ),
});

export type ManageCreditorFormDto = z.infer<typeof schema>;

interface Props {
  creditor?: ICreditor;
  isEditing: boolean;
}

export default function CreditorsManageForm({ creditor, isEditing }: Props) {
  const router = useRouter();

  const form = useForm<ManageCreditorFormDto>({
    resolver: zodResolver(schema),
    defaultValues: isEditing && {
      name: creditor?.name,
      document: creditor?.document,
      type: creditor?.type,
    },
  });

  async function submit(payload: ManageCreditorFormDto) {
    if (isEditing) {
      const { status, message, data } = await updateCreditor(
        creditor.id,
        payload
      );

      if (!data) {
        toast.error(`Erro ao atualizar credor: ${message}`);
        return;
      }

      if (status === 200) {
        handleUpdateList(data);
      }

      return;
    }

    const { status, message, data } = await createCreditor(payload);

    if (!data) {
      toast.error(`Erro ao criar credor: ${message}`);
      return;
    }

    if (status === 201) {
      handleUpdateList(data);
    }
  }

  function handleUpdateList(data: GetCreditorsResponseDto['creditors'][0]) {
    const creditorsListCache =
      queryClient.getQueriesData<GetCreditorsResponseDto>({
        queryKey: ['creditors'],
      });

    creditorsListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;

      queryClient.setQueryData(cacheKey, (query: GetCreditorsResponseDto) => {
        if (!query) return;

        let { creditors } = query;

        if (isEditing) {
          creditors = creditors.map((creditor) => {
            if (creditor.id === data.id) {
              return data;
            }

            return creditor;
          });
        } else {
          creditors.push(data);
        }

        return {
          ...query,
          creditors,
        };
      });
    });

    router.push('/app/creditors');
  }

  function handleBack() {
    router.push('/app/creditors');
  }

  return (
    <div className='flex flex-col gap-2 '>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className='flex flex-col gap-4'
        >
          <header className='flex justify-between items-center'>
            <div className='space-y-2'>
              <h1 className='font-medium text-xl'>
                {isEditing ? 'Editar' : 'Criar'} credor
              </h1>
              <span className='opacity-80 text-sm'>
                {isEditing
                  ? 'Edite o credor existente'
                  : 'Cadastre um novo credor'}
              </span>
            </div>

            <div className='full-center gap-2'>
              <Button
                type='button'
                variant='secondary'
                leftIcon={<ArrowUturnLeftIcon className='h-4 w-4' />}
                onClick={handleBack}
              >
                Voltar
              </Button>
              {form.formState.isSubmitting ? (
                <Button disabled className='w-36' type='submit'>
                  <Loader2Icon className='animate-spin h-4 w-4' />
                </Button>
              ) : (
                <Button className='w-36' type='submit'>
                  Salvar alterações
                </Button>
              )}
            </div>
          </header>

          <div className='flex flex-col gap-4 w-full'>
            <CreditorsFormInput
              field={{
                key: 'name',
                title: 'Nome',
                description: 'Nome do credor',
                placeholder: 'Nome do credor',
              }}
              form={form}
            />

            <CreditorsFormInput
              field={{
                key: 'document',
                title: 'Documento',
                description: 'CPF ou CNPJ',
                placeholder: 'Digite o CPF ou CNPJ',
              }}
              form={form}
            />

            <CreditorsSelectInput
              field={{
                key: 'type',
                title: 'Tipo',
                description: 'Tipo do credor',
                placeholder: 'Tipo do credor',
                options: [
                  {
                    label: 'Fornecedor',
                    value: 'SUPPLIER',
                  },
                  {
                    label: 'Serviços',
                    value: 'SERVICES',
                  },
                  {
                    label: 'Impostos',
                    value: 'TAXES',
                  },
                  {
                    label: 'Funcionários',
                    value: 'EMPLOYEES',
                  },
                  {
                    label: 'Bancos',
                    value: 'BANKS',
                  },
                  {
                    label: 'Outros',
                    value: 'OTHER',
                  },
                ],
              }}
              form={form}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
