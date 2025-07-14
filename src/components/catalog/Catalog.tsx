// GameCatalog.tsx
"use client";

import GameCard from "@/components/catalog/GameCard";
import { Game } from "@/utils/endpoint";
import { useCartContext } from "@/context/CartContext";
import { useEffect } from "react";

export default function GameCatalog({ games }: { games: Game[] }) {
  const { cart, toggleCart, isInCart } = useCartContext();

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  return (
    <div className="px-4">
      <section
        className="px-4 py-6 border-b border-border-light"
        aria-labelledby="top-sellers-heading"
      >
        <div className="max-w-[1200px] mx-auto">
          <h1
            id="top-sellers-heading"
            className="text-[36px] leading-[40px] font-bold mb-4 text-text"
          >
            Top Sellers
          </h1>
        </div>

        <fieldset
          className="mb-6 flex sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-4"
          aria-label="Filter games by genre"
        >
          <legend className="sr-only">Genre Filter</legend>

          <label htmlFor="genre" className="text-[20px] font-bold text-text">
            Genre
          </label>

          <span className="text-[20px] font-light text-text">|</span>

          <select
            id="genre"
            name="genre"
            className="custom-select text-text focus:outline-none font-archivo text-[20px] w-full sm:w-[270px]"
            aria-label="Select game genre"
          >
            <option value="all">All</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="strategy">Strategy</option>
            <option value="rpg">RPG</option>
          </select>
        </fieldset>
      </section>
      <div className=" max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto py-6 justify-items-center">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            isInCart={isInCart(game.id)}
            onToggleCart={() => toggleCart(game.id)}
          />
        ))}
      </div>
    </div>
  );
}
