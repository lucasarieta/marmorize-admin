'use client';

import { getCreditor } from '@/actions/creditors/get-creditor';
import CreditorsManageForm from '@/components/creditors/creditors-manage-form';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  const isEditing = id !== undefined && id !== 'new';

  const {
    data: creditor,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['customer', id],
    queryFn: () => getCreditor(id.toString()),
    staleTime: 1000 * 60 * 15, // 15 minutes
    enabled: isEditing,
  });

  if (isEditing && (isLoading || isFetching)) {
    return <></>;
  }

  if (isEditing && !creditor) {
    return <div>Credor não encontrado</div>;
  }

  return <CreditorsManageForm creditor={creditor} isEditing={isEditing} />;
}
