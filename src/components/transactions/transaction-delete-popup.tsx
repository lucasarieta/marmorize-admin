'use client';

import { deleteTransaction } from '@/actions/transactions/delete-transaction';
import { queryClient } from '@/lib/react-query';
import { DialogProps } from '@radix-ui/react-dialog';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface Props extends DialogProps {
  transactionId: string;
}

export default function TransactionDeletePopup({
  transactionId,
  ...props
}: Props) {
  async function onDelete() {
    try {
      await deleteTransaction(transactionId);

      queryClient.invalidateQueries({
        queryKey: ['transactions:list'],
      });

      props.onOpenChange(false);
      toast.success('Transação deletada com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar transação');
    }
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita. Esta transação será removido do
            sistema.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => props.onOpenChange(false)} variant='secondary'>
            Cancelar
          </Button>
          <Button onClick={onDelete}>Deletar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
