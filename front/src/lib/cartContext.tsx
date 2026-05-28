'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

type Action =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; id: string }
  | { type: 'UPDATE'; id: string; qty: number }
  | { type: 'CLEAR' };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const idx = state.findIndex((i) => i.id === action.item.id);
      if (idx >= 0) {
        return state.map((i, j) =>
          j === idx ? { ...i, quantity: i.quantity + action.item.quantity } : i
        );
      }
      return [...state, action.item];
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id);
    case 'UPDATE':
      if (action.qty <= 0) return state.filter((i) => i.id !== action.id);
      return state.map((i) => (i.id === action.id ? { ...i, quantity: action.qty } : i));
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

interface CartCtx {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
}

const Ctx = createContext<CartCtx | null>(null);

function initCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const s = localStorage.getItem('sotilma-cart');
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(reducer, [], initCart);

  useEffect(() => {
    localStorage.setItem('sotilma-cart', JSON.stringify(items));
  }, [items]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <Ctx.Provider
      value={{
        items,
        count,
        total,
        add:    (item) => dispatch({ type: 'ADD', item }),
        remove: (id)   => dispatch({ type: 'REMOVE', id }),
        update: (id, qty) => dispatch({ type: 'UPDATE', id, qty }),
        clear:  ()     => dispatch({ type: 'CLEAR' }),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart: missing CartProvider');
  return ctx;
}
