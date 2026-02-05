"use client";

import { create } from "zustand";

type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: { name: string; price: number }, quantity?: number) => void;
  removeItem: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item, quantity = 1) => {
    if (quantity <= 0) return;

    set((state) => {
      const existingIndex = state.items.findIndex(
        (cartItem) => cartItem.name === item.name,
      );

      if (existingIndex === -1) {
        return { items: [...state.items, { ...item, quantity }] };
      }

      return {
        items: state.items.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem,
        ),
      };
    });
  },
  removeItem: (name) =>
    set((state) => ({
      items: state.items.filter((item) => item.name !== name),
    })),
  updateQuantity: (name, quantity) => {
    if (quantity <= 0) {
      set((state) => ({
        items: state.items.filter((item) => item.name !== name),
      }));
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.name === name ? { ...item, quantity } : item,
      ),
    }));
  },
  clearCart: () => set({ items: [] }),
  totalItems: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  totalPrice: () =>
    get().items.reduce((total, item) => total + item.price * item.quantity, 0),
}));
