'use server';

import { ManageCreditorFormDto } from '@/components/creditors/creditors-manage-form';
import { getDocumentType, isDocumentValid } from '@/lib/document';
import prisma from '@/lib/prisma';

export async function updateCreditor(
  id: string,
  payload: ManageCreditorFormDto
) {
  const { name, document, type } = payload;

  if (!isDocumentValid(document)) {
    return {
      status: 400,
      message: 'Documento inválido',
    };
  }

  const documentType = getDocumentType(document);
  if (documentType !== 'CPF' && documentType !== 'CNPJ') {
    return {
      status: 400,
      message: 'Documento inválido',
    };
  }

  const update = await prisma.creditor.update({
    where: {
      id,
    },
    data: {
      name,
      document,
      documentType,
      type,
    },
  });

  return {
    status: 200,
    data: update,
  };
}
