interface Props {
  date: Date;
}

export default function TransactionTable({ date }: Props) {
  return <h1>{date.toLocaleDateString('pt-BR', { weekday: 'long' })}</h1>;
}
