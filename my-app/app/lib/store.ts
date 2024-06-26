import { ProductsProps } from './definitions';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { products } from './products';

// State types
interface States {
  bearProducts: ProductsProps[];
};

// Action types
interface Actions {
  addProducts: (products: ProductsProps[]) => void;
};

// useBearStore
export const useStore = create(
  persist<States & Actions>(
    (set) => ({
      bearProducts: products,
      addProducts: (newProducts) => set((state) => ({
        bearProducts: [...state.bearProducts, ...newProducts]
      })),
    }),
    {
      name: 'bearStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);