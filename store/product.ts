import { Cart } from "@/@types";
import { create } from "zustand";

type CartValue = {
  cartItems: Cart[];
};

type CartActions = {
  addProduct: (product: Cart) => void;
  deleteProduct: (id: number) => void;
  updateProduct: (id: number, product: Cart) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

export const useProductStore = create<CartValue & CartActions>((set) => ({
  cartItems: [],
  addProduct: (product: Cart) =>
    set((state) => ({ cartItems: [...state.cartItems, product] })),
  deleteProduct: (id: number) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  updateProduct: (id: number, product: Cart) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? product : item
      ),
    })),
  clearCart: () => set({ cartItems: [] }),
  updateCartQuantity: (id: number, quantity: number) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
}));
