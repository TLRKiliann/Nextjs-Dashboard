import { $Enums, type Product } from '@prisma/client';
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
  persist((set) => ({
      bearProducts: [],
      addProducts: (product) => {
        set((state) => {
          const itemExists = state.bearProducts.find((cartItem) => cartItem.id === product.id)
          if (itemExists) {
            return {
              bearProducts: state.bearProducts.map((cartItem) => cartItem.id === product.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
              ),
            }
          }
          return {
            bearProducts: [...state.bearProducts, { ...product, quantity: 1 }],
          };
        }
      )},
      deleteProducts: (product) => {
        set((state) => {
          const itemExists = state.bearProducts.find((cartItem) => cartItem.id === product.id)
          if (itemExists) {
            return {
              bearProducts: state.bearProducts.map((cartItem) => cartItem.id === product.id
                ? { ...cartItem, quantity: cartItem.quantity - 1 }
                : cartItem
              ),
            }
          }
          return {
            bearProducts: [...state.bearProducts, { ...product, quantity: 1 }],
          };
        }
      )},
      increaseQuantity: (productId) => {
        set((state) => {
          const itemExists = state.bearProducts.find((cartItem) => cartItem.id === productId);
          if (itemExists) {
            return {
              bearProducts: state.bearProducts.map((cartItem) => cartItem.id === productId
                ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 }
                : cartItem
              ),
            }
          }
          return state;
        }
      )},
      decreaseQuantity: (productId) => {
        set((state) => {
          const itemExists = state.bearProducts.find((cartItem) => cartItem.id === productId);
          if (itemExists) {
            return {
              bearProducts: state.bearProducts.map((cartItem) => cartItem.id === productId
                ? { ...cartItem, quantity: (cartItem.quantity || 0) - 1 }
                : cartItem
              ),
            }
          }
          return state;
        }
      )},
      removeAllById: (productId) => {
        set((state) => {
          const itemExists = state.bearProducts.find((product) => product.id === productId);
          if (itemExists) {
            return {
              bearProducts: state.bearProducts.filter((cartItem) => cartItem.id === productId),
            }
          }
          return state;
        }
      )}
    }),
    {
      name: "cart-items",
    }
  )
);
