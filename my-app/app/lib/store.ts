import { StaticImageData } from 'next/image';
import type { ProductsProps } from './definitions';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
//import { products } from './products';

// State types
interface States {
  bearProducts: ProductsProps[];
};

// Action types
interface Actions {
  addProducts: (products: ProductsProps) => void;
  deleteProducts: (products: ProductsProps) => void;
  removeAllProducts: (products: ProductsProps[]) => void;
};
 
// useBearStore
export const useStore = create<States & Actions>()(
  persist(
    (set) => ({
      bearProducts: [],
      addProducts: (product) =>
        set((state) => ({ bearProducts: [...state.bearProducts, product]
      })),
      deleteProducts: (product) =>
        set((state) => ({ bearProducts: [...state.bearProducts, product]  
      })),
      removeAllProducts: () =>
        set(({ bearProducts: [] 
      })),
    }),
    {
      name: 'bearStore',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
