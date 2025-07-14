"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

type CartContextType = {
  cart: string[];
  toggleCart: (id: string) => void;
  isInCart: (id: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<string[]>([]);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        console.error("Error parsing cart from localStorage");
      }
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, initialized]);

  const toggleCart = (id: string) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isInCart = (id: string) => cart.includes(id);

  return (
    <CartContext.Provider value={{ cart, toggleCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
