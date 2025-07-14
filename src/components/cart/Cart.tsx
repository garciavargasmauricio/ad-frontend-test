// src/components/CartPageContent.tsx
"use client";

import BackToCatalog from "@/components/common/BackToCatalog";
import { useCartContext } from "@/context/CartContext";
import { Game } from "@/utils/endpoint";
import { lazy, Suspense, useMemo } from "react";

type Props = {
  games: Game[];
};

const OrderSummary = lazy(() => import("./OrderSummary"));
const CartGameCard = lazy(() => import("./CartGameCard"));

export default function Cart({ games }: Props) {
  const { cart, toggleCart } = useCartContext();

  const fullGames = useMemo(
    () => games.filter((game) => cart.includes(game.id)),
    [games, cart]
  );

  return (
    <section className="px-4 py-6 max-w-[1200px] mx-auto">
      <BackToCatalog />
      <h1 className="text-[32px] font-bold mb-2">Your Cart</h1>
      <p className="text-gray-500 mb-6">{fullGames.length} items</p>

      <div className="grid mx-6 md:grid-cols-3 gap-10 justify-items-center">
        <div className="md:col-span-2 flex flex-col gap-6">
          {fullGames.map((game) => (
            <Suspense fallback={<p>Loading games in cart...</p>}>
              <CartGameCard
                key={game.id}
                game={game}
                onRemove={() => toggleCart(game.id)}
              />
            </Suspense>
          ))}
        </div>
        <Suspense fallback={<p>Loading summary...</p>}>
          <OrderSummary games={fullGames} />
        </Suspense>
      </div>
    </section>
  );
}
