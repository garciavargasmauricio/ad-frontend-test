"use Client";
import Image from "next/image";
import { Game } from "@/utils/endpoint";

type Props = {
  game: Game;
  onRemove: (game: Game) => void;
};

export default function CartGameCard({ game, onRemove }: Props) {
  return (
    <div className="flex gap-4 border-b pb-4">
      <Image
        src={game.image}
        alt={game.name}
        width={160}
        height={100}
        className="rounded object-cover"
      />
      <div className="flex-1">
        <p className="text-sm text-gray-500 font-bold">{game.genre}</p>
        <p className="font-bold text-lg">{game.name}</p>
        <p className="text-gray-500 text-sm">{game.description}</p>
      </div>
      <div className="text-right">
        <button onClick={() => onRemove(game)} className="text-gray-400">
          ×
        </button>
        <p className="font-bold mt-2">${game.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
