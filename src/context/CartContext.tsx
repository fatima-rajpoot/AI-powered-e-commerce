"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  cartCount: number;
  toast: string | null;
  isOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  checkout: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const addToCart = useCallback((product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setToast(`${product.name} added to cart!`);
    setIsOpen(true);
    window.setTimeout(() => setToast(null), 3000);
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const checkout = useCallback(() => {
    if (items.length === 0) return;

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    setItems([]);
    setIsOpen(false);
    setToast(`Order placed! ${itemCount} item(s) — $${total.toFixed(2)}`);
    window.setTimeout(() => setToast(null), 4000);
  }, [items]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        toast,
        isOpen,
        addToCart,
        removeFromCart,
        checkout,
        openCart,
        closeCart,
      }}
    >
      {children}
      {toast && (
        <div className="cart-toast cart-toast--visible" role="status" aria-live="polite">
          ✓ {toast}
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
