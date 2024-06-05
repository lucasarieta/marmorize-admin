export interface ICreditor {
  id: string;
  name: string;
  document: string;
  documentType: 'CPF' | 'CNPJ';
  type: 'SUPPLIER' | 'SERVICES' | 'TAXES' | 'EMPLOYEES' | 'BANKS' | 'OTHER';
}
