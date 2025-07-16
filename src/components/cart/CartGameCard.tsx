"use client";

import React from "react"; // For testing purposes
import Image from "next/image";
import { Game } from "@/utils/endpoint";

/**
 * Props for the `CartGameCard` component.
 *
 * @typedef {Object} Props
 * @property {Game} game - The game object to display in the cart.
 * @property {(game: Game) => void} onRemove - Callback invoked when removing the game from the cart.
 */
type Props = {
  game: Game;
  onRemove: (game: Game) => void;
};

/**
 * `CartGameCard` component.
 *
 * Displays a single game's information inside the cart view,
 * including genre, title, description, price, and a remove button.
 *
 * @component
 * @param {Props} props - The props for this component.
 * @returns {JSX.Element} Rendered game card for the cart.
 */
export default function CartGameCard({ game, onRemove }: Props) {
  return (
    <div
      className="flex gap-4 border-b pb-4"
      role="group"
      aria-label={`Cart item: ${game.name}`}
      data-testid={`cart-item-${game.id}`}
    >
      <Image
        src={game.image}
        alt={`Cover of ${game.name}`}
        width={160}
        height={100}
        className="rounded object-cover"
        data-testid="cart-item-image"
      />

      <div className="flex-1">
        <p
          className="text-sm text-gray-500 font-bold"
          data-testid="cart-item-genre"
        >
          {game.genre}
        </p>
        <p className="font-bold text-lg" data-testid="cart-item-name">
          {game.name}
        </p>
        <p
          className="text-gray-500 text-sm"
          data-testid="cart-item-description"
        >
          {game.description}
        </p>
      </div>

      <div className="text-right">
        <button
          onClick={() => onRemove(game)}
          className="text-gray-400"
          aria-label={`Remove ${game.name} from cart`}
          data-testid="cart-item-remove"
        >
          ×
        </button>
        <p className="font-bold mt-2" data-testid="cart-item-price">
          ${game.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
