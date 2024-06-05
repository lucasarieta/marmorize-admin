'use server';

import { ManageCreditorFormDto } from '@/components/creditors/creditors-manage-form';
import { getDocumentType, isDocumentValid } from '@/lib/document';
import prisma from '@/lib/prisma';

export async function createCreditor(payload: ManageCreditorFormDto) {
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

  console.warn(payload);

  const newCreditor = await prisma.creditor.create({
    data: {
      name,
      document,
      documentType,
      type,
    },
  });

  return {
    status: 201,
    data: newCreditor,
  };
}
