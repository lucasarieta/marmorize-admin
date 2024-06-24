import { LucideIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Skeleton } from '../ui/skeleton';

interface Props {
  title: string;
  icon: LucideIcon;
  amount: number;
  description: string;
}

export default function MetricCard({
  title,
  icon: Icon,
  amount,
  description,
}: Props) {
  return (
    <Card className='flex flex-col gap-2'>
      <CardHeader className='flex flex-row items-center justify-between text-gray-600'>
        <CardTitle className='text-md font-normal'>{title}</CardTitle>
        <CardDescription>
          <Icon className='h-5 w-5' />
        </CardDescription>
      </CardHeader>
      <CardContent className='font-semibold text-2xl'>
        {amount ?? <Skeleton className='h-8 w-24' />}
      </CardContent>
      <CardFooter>
        <p>{description}</p>
      </CardFooter>
    </Card>
  );
}
