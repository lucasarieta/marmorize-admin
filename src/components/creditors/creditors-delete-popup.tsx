'use client';

import { DialogProps } from '@radix-ui/react-dialog';
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
  onDelete: () => void;
}

export default function CreditorsDeletePopup({ onDelete, ...props }: Props) {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita. Este credor será removido do
            sistema.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => props.onOpenChange(false)}>Cancelar</Button>
          <Button onClick={onDelete} variant='destructive'>
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
