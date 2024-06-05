export function isDocumentValid(document: string) {
  return /^[0-9]{11}$/.test(document) || /^[0-9]{14}$/.test(document);
}

export function getDocumentType(document: string): 'CPF' | 'CNPJ' {
  if (/^[0-9]{11}$/.test(document)) {
    return 'CPF';
  }

  if (/^[0-9]{14}$/.test(document)) {
    return 'CNPJ';
  }
}
