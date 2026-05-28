'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cartContext';

export default function CartIcon() {
  const { count } = useCart();
  return (
    <Link
      href="/panier"
      className="relative inline-flex items-center justify-center w-10 h-10 text-[#1E72B8] hover:opacity-70 transition-all duration-200"
      aria-label="Panier"
    >
      <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[10px] font-normal leading-none text-white bg-red-500">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </Link>
  );
}
