'use client';

import {
  BuildingOffice2Icon,
  CreditCardIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { ArrowUpLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { twMerge } from 'tailwind-merge';

const navigation = [
  { name: 'Dashboard', href: '/app', icon: HomeIcon },
  { name: 'Credores', href: '/app/creditors', icon: UsersIcon },
  { name: 'Transações', href: '/app/transactions', icon: CreditCardIcon },
];

export default function Sidebar() {
  return (
    <nav className='h-full border-r flex flex-col px-5 py-8 gap-y-8'>
      <div className='flex items-center font-semibold gap-x-3 text-gray-700'>
        <BuildingOffice2Icon className='h-6 w-6 shrink-0' />
        <h1>Marmoraria Schuler</h1>
      </div>

      <ul className='flex flex-col gap-2'>
        {navigation.map((item) => (
          <Item key={item.href} item={item} />
        ))}
      </ul>

      <ul className='mt-auto'>
        <li>
          <button className='full-center gap-2 p-2 text-sm leading-6 text-gray-700 hover:text-blue-600  hover-effect opacity-50'>
            <div className='bg-zinc-100 p-1 rounded-md'>
              <ArrowUpLeft className='h-4 w-4 shrink-0' />
            </div>
            Desconectar
          </button>
        </li>
      </ul>
    </nav>
  );
}

function Item({ item }: { item: (typeof navigation)[number] }) {
  const pathname = usePathname();
  const isActive = pathname.split('/')[2] === item.href.split('/')[2];

  return (
    <Link
      className={twMerge(
        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium hover-effect',
        isActive
          ? 'text-blue-600 bg-blue-100/30'
          : 'text-gray-700 hover:bg-zinc-50'
      )}
      href={item.href}
      key={item.name}
    >
      <item.icon className='h-6 w-6 shrink-0' />
      {item.name}
    </Link>
  );
}
