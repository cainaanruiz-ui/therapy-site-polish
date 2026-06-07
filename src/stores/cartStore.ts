import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  priceCents: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: () => number;
  subtotalCents: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const existing = get().items.find((i) => i.productId === item.productId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i,
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity }] });
        }
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return;
        }
        set({
          items: get().items.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
        });
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
      subtotalCents: () => get().items.reduce((s, i) => s + i.priceCents * i.quantity, 0),
    }),
    {
      name: "h2h-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    },
  ),
);

export const formatCents = (cents: number) =>
  (cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });