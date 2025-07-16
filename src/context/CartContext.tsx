"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

/**
 * Type definition for the Cart Context.
 * Represents the shape of the cart state and actions available via context.
 */
type CartContextType = {
  cart: string[]; // List of game IDs in the cart
  toggleCart: (id: string) => void; // Adds or removes a game from the cart
  isInCart: (id: string) => boolean; // Checks if a game is already in the cart
};

/**
 * React Context for managing cart state across the application.
 */
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * `CartProvider` wraps any part of the application that needs access to the cart state.
 *
 * It initializes the cart from `localStorage` on mount,
 * and keeps it in sync with localStorage on updates.
 *
 * @param {React.ReactNode} children - The React children that will consume the cart context.
 * @returns {JSX.Element} The context provider with cart state and actions.
 */
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  // Load cart from localStorage on initial mount
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

  // Persist cart to localStorage only after initial load
  useEffect(() => {
    if (initialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, initialized]);

  /**
   * Adds a game to the cart if not present, or removes it if already added.
   *
   * @param {string} id - Game ID to toggle
   */
  const toggleCart = (id: string) => {
    setCart((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  /**
   * Checks whether a given game is in the cart.
   *
   * @param {string} id - Game ID to check
   * @returns {boolean} `true` if the game is in the cart
   */
  const isInCart = (id: string) => cart.includes(id);

  return (
    <CartContext.Provider value={{ cart, toggleCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to access the cart context.
 *
 * Must be used within a `CartProvider`.
 * @returns {CartContextType} Cart context value.
 * @throws Will throw an error if used outside of the `CartProvider`.
 */
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
