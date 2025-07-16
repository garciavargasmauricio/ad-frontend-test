"use client";

import React from "react"; // For testging purposes
import { Game } from "@/utils/endpoint";
import Image from "next/image";

/**
 * Props for the GameCard component.
 *
 * @typedef {Object} GameCardProps
 * @property {Game} game - The game object to display.
 * @property {boolean} [isInCart] - Indicates whether the game is currently in the cart.
 * @property {(id: string) => void} onToggleCart - Callback function to toggle the game in the cart.
 */
type GameCardProps = {
  game: Game;
  isInCart?: boolean;
  onToggleCart: (id: string) => void;
};

/**
 * `GameCard` component.
 *
 * Renders an individual game card with an image, name, genre, price, and
 * a button to add or remove the game from the cart. If the game is new,
 * a badge is displayed.
 *
 * @component
 * @param {GameCardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered game card.
 */
export default function GameCard({
  game,
  isInCart,
  onToggleCart,
}: GameCardProps) {
  return (
    <div
      className="rounded-xl border p-4 flex flex-col justify-between w-full max-w-[320px] shadow-sm"
      data-testid={`game-card-${game.id}`}
    >
      <div className="relative">
        <Image
          src={game.image}
          alt={game.name}
          className="w-full h-48 object-cover rounded-lg"
          data-testid="game-image"
          width={320}
          height={180}
        />
        {game.isNew && (
          <span
            className="absolute top-2 left-2 bg-new text-text text-xs px-2 py-1 rounded"
            data-testid="game-new-badge"
          >
            New
          </span>
        )}
      </div>

      <div className="mt-4">
        <p
          className="text-xs text-gray-500 font-bold uppercase"
          data-testid="game-genre"
        >
          {game.genre}
        </p>
        <div className="flex justify-between items-center mt-1">
          <h3 className="font-bold text-base" data-testid="game-name">
            {game.name}
          </h3>
          <span className="font-bold text-base" data-testid="game-price">
            ${game.price}
          </span>
        </div>
      </div>

      <button
        onClick={() => onToggleCart(game.id)}
        className="mt-4 w-full text-center border rounded px-4 py-2 font-semibold text-sm hover:bg-gray-100 transition"
        data-testid="toggle-cart-button"
      >
        {isInCart ? "REMOVE" : "ADD TO CART"}
      </button>
    </div>
  );
}
