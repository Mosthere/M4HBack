"use client";

import { CartItem } from "@/types/cart";
import { createContext, useContext, ReactNode, useState } from "react";
import axios from "axios";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => Promise<void>;
  incrementQuantity: (productId: number) => void;
}

const cartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  async function addToCart(product: CartItem) {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        productId: product.id,
        quantity: 1,
      });

      setCart((prev) => {
        const exist = prev.find((item) => item.id === product.id);
        if (exist) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prev, { ...product, quantity: 1 }];
        }
      });
    } catch (err) {
      console.error("Error al cargar producto al carrito", err);
    }
  }

  function incrementQuantity(productId: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  return (
    <cartContext.Provider value={{ cart, addToCart, incrementQuantity }}>
      {children}
    </cartContext.Provider>
  );
}
export function useCart() {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}
