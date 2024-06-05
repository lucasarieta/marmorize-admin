import { Creditor } from '@prisma/client';

export function getCreditorType(type: Creditor['type']) {
  switch (type) {
    case 'SUPPLIER':
      return 'Fornecedor';
    case 'SERVICES':
      return 'Serviços';
    case 'TAXES':
      return 'Impostos';
    case 'EMPLOYEES':
      return 'Funcionários';
    case 'BANKS':
      return 'Bancos';
    case 'OTHER':
      return 'Outros';
  }
}
