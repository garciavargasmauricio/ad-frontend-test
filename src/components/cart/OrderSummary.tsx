"use client";

import React from "react"; // For testing purposes
import { Game } from "@/utils/endpoint";

type Props = {
  games: Game[];
};

export default function OrderSummary({ games }: Props) {
  const total = games.reduce((acc, g) => acc + g.price, 0);

  return (
    <div
      className="w-full sm:max-w-sm"
      aria-labelledby="order-summary-title"
      role="region"
      data-testid="order-summary"
    >
      <div className="border rounded-lg p-6 w-full">
        <h2
          className="font-bold text-lg mb-2"
          id="order-summary-title"
          data-testid="order-summary-title"
        >
          Order Summary
        </h2>

        <p
          className="mb-4 text-sm text-gray-500"
          data-testid="order-summary-count"
        >
          {games.length} item{games.length !== 1 && "s"}
        </p>

        <ul className="text-sm mb-4" aria-label="Game list in order summary">
          {games.map((g) => (
            <li
              key={g.id}
              className="flex justify-between mb-1"
              data-testid={`order-summary-item-${g.id}`}
            >
              <span>{g.name}</span>
              <span>${g.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div
          className="flex justify-between font-bold border-t pt-2"
          data-testid="order-summary-total"
        >
          <span>Order Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        className="mt-4 w-full bg-gray-700 text-white py-2 rounded font-semibold"
        aria-label="Proceed to checkout"
        data-testid="order-summary-checkout"
      >
        Checkout
      </button>
    </div>
  );
}
