"use client";

import React from "react"; // For testing purposes
import BackToCatalog from "@/components/common/BackToCatalog";
import { useCartContext } from "@/context/CartContext";
import { Game } from "@/utils/endpoint";
import { lazy, Suspense, useMemo } from "react";

type Props = {
  games: Game[];
};

/**
 * Dynamically imported `OrderSummary` component using React.lazy.
 */
const OrderSummary = lazy(() => import("./OrderSummary"));

/**
 * Dynamically imported `CartGameCard` component using React.lazy.
 */
const CartGameCard = lazy(() => import("./CartGameCard"));

/**
 * Props expected by the `Cart` component.
 *
 * @typedef {Object} Props
 * @property {Game[]} games - List of all available games fetched from the backend.
 */

/**
 * Cart page component.
 *
 * - Displays the list of games added to the user's cart.
 * - Allows removing items via context.
 * - Shows a summary of the current order.
 *
 * @component
 * @param {Props} props - Props containing all games available.
 * @returns {JSX.Element} The rendered cart page UI.
 */
export default function Cart({ games }: Props) {
  const { cart, toggleCart } = useCartContext();

  /**
   * Filters all games to only include those present in the `cart` context.
   */
  const fullGames = useMemo(
    () => games.filter((game) => cart.includes(game.id)),
    [games, cart]
  );

  return (
    <section
      className="px-4 py-6 max-w-[1200px] mx-auto"
      aria-labelledby="cart-heading"
      data-testid="cart-section"
    >
      <BackToCatalog />

      <h1
        id="cart-heading"
        className="text-[32px] font-bold mb-2"
        data-testid="cart-title"
      >
        Your Cart
      </h1>

      <p className="text-gray-500 mb-6" data-testid="cart-count">
        {fullGames.length} item{fullGames.length !== 1 && "s"}
      </p>

      <div
        className="grid mx-6 md:grid-cols-3 gap-10 justify-items-center"
        data-testid="cart-grid"
      >
        <div
          className="md:col-span-2 flex flex-col gap-6"
          aria-label="Games in your cart"
          data-testid="cart-games"
        >
          {fullGames.map((game) => (
            <Suspense
              key={game.id}
              fallback={
                <p data-testid={`loading-game-${game.id}`}>
                  Loading games in cart...
                </p>
              }
            >
              <CartGameCard
                game={game}
                onRemove={() => toggleCart(game.id)}
                data-testid={`cart-game-${game.id}`}
              />
            </Suspense>
          ))}
        </div>

        <Suspense
          fallback={<p data-testid="loading-summary">Loading summary...</p>}
        >
          <OrderSummary games={fullGames} data-testid="cart-summary" />
        </Suspense>
      </div>
    </section>
  );
}
