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

export function maskDocument(document: string, documentType: 'CPF' | 'CNPJ') {
  if (documentType === 'CPF') {
    const cleanedValue = document.replace(/\D/g, '');

    let formattedValue = '';

    formattedValue += cleanedValue.slice(0, 3) + '.';
    formattedValue += cleanedValue.slice(3, 6) + '.';
    formattedValue += cleanedValue.slice(6, 9) + '-';
    formattedValue += cleanedValue.slice(9, 11);

    return formattedValue;
  }

  if (documentType === 'CNPJ') {
    const cleanedValue = document.replace(/\D/g, '');

    let formattedValue = '';

    formattedValue += cleanedValue.slice(0, 2) + '.';
    formattedValue += cleanedValue.slice(2, 4) + '.';
    formattedValue += cleanedValue.slice(4, 8) + '.';
    formattedValue += cleanedValue.slice(8, 12) + '/';
    formattedValue += cleanedValue.slice(12, 14);

    return formattedValue;
  }
}
