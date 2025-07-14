"use client";

import { Game } from "@/utils/endpoint";

type GameCardProps = {
  game: Game;
  isInCart?: boolean;
  onToggleCart: (id: string) => void;
};

export default function GameCard({
  game,
  isInCart,
  onToggleCart,
}: GameCardProps) {
  return (
    <div className="rounded-xl border p-4 flex flex-col justify-between w-full max-w-[320px] shadow-sm">
      <div className="relative">
        <img
          src={game.image}
          alt={game.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        {game.isNew && (
          <span className="absolute top-2 left-2 bg-new text-text text-xs px-2 py-1 rounded">
            New
          </span>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs text-gray-500 font-bold uppercase">
          {game.genre}
        </p>
        <div className="flex justify-between items-center mt-1">
          <h3 className="font-bold text-base">{game.name}</h3>
          <span className="font-bold text-base">${game.price}</span>
        </div>
      </div>

      <button
        onClick={() => onToggleCart(game.id)}
        className="mt-4 w-full text-center border rounded px-4 py-2 font-semibold text-sm hover:bg-gray-100 transition"
      >
        {isInCart ? "REMOVE" : "ADD TO CART"}
      </button>
    </div>
  );
}
