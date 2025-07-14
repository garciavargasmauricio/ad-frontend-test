"use client";

import { Game } from "@/utils/endpoint";

type Props = {
  games: Game[];
};

export default function OrderSummary({ games }: Props) {
  const total = games.reduce((acc, g) => acc + g.price, 0);

  return (
    <div className="w-full sm:max-w-sm">
      <div className="border rounded-lg p-6 w-full">
        <h2 className="font-bold text-lg mb-2">Order Summary</h2>
        <p className="mb-4 text-sm text-gray-500">{games.length} items</p>

        <ul className="text-sm mb-4">
          {games.map((g) => (
            <li key={g.id} className="flex justify-between mb-1">
              <span>{g.name}</span>
              <span>${g.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-between font-bold border-t pt-2">
          <span>Order Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="mt-4 w-full bg-gray-700 text-white py-2 rounded font-semibold">
        Checkout
      </button>
    </div>
  );
}
