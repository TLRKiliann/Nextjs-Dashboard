import type { Product } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// State types
type States = {
  bearProducts: Product[];
};

// Action types
type Actions = {
  addProducts: (products: Product) => void;
  deleteProducts: (products: Product) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  removeAllById: (productId: number) => void;
};

// useBearStore
export const useStore = create<States & Actions>()(
  persist((set, get) => ({
      bearProducts: [],
      addProducts: (product) => {
        const itemExists = get().bearProducts.find((cartItem) => cartItem.id === product.id)
        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }
          set({ bearProducts: [...get().bearProducts] })
        } else {
          set({ bearProducts: [...get().bearProducts, { ...product, quantity: 1 }] })
        }
      },
      deleteProducts: (product) => {
        const itemExists = get().bearProducts.find((cartItem) => cartItem.id === product.id)
        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity--;
          }
          set({ bearProducts: [...get().bearProducts] })
        } else {
          set({ bearProducts: [...get().bearProducts, { ...product, quantity: 1 }] })
        }
      },
      increaseQuantity: (productId) => {
        const itemExists = get().bearProducts.find(
          (cartItem) => cartItem.id === productId
        );

        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            itemExists.quantity++;
          }
          set({ bearProducts: [...get().bearProducts] });
        }
      },
      decreaseQuantity: (productId) => {
        const itemExists = get().bearProducts.find(
          (cartItem) => cartItem.id === productId
        );
        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            if (itemExists.quantity === 1) {
              const updatedbearProducts = get().bearProducts.filter(
                (item) => item.id !== productId
              );
              set({ bearProducts: updatedbearProducts });
            } else {
              itemExists.quantity--;
              set({ bearProducts: [...get().bearProducts] });
            }
          }
        }
      },
      removeAllById: (productId) => {
        const itemExists = get().bearProducts.find(
          (product) => product.id === productId
        );
        if (itemExists) {
          if (typeof itemExists.quantity === "number") {
            const updatedbearProducts = get().bearProducts.filter(
              (product) => product.id !== itemExists.id
            );
            set({ bearProducts: updatedbearProducts });
          }
        }
      },
    }),
    {
      name: "cart-items",
    }
  )
);
