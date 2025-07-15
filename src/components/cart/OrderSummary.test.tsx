import React from "react";
import { render, screen } from "@testing-library/react";
import OrderSummary from "./OrderSummary";
import { Game } from "@/utils/endpoint";

const mockGames: Game[] = [
  {
    id: "1",
    name: "God of War",
    genre: "Action",
    price: 49.99,
    image: "/gow.jpg",
    description: "A story-driven action game",
    isNew: false,
  },
  {
    id: "2",
    name: "Stardew Valley",
    genre: "Simulation",
    price: 14.99,
    image: "/stardew.jpg",
    description: "Farming and life sim",
    isNew: true,
  },
];

describe("OrderSummary", () => {
  it("renders title, item count, and total", () => {
    render(<OrderSummary games={mockGames} />);

    expect(screen.getByTestId("order-summary-title")).toHaveTextContent(
      "Order Summary"
    );
    expect(screen.getByTestId("order-summary-count")).toHaveTextContent(
      "2 items"
    );
    expect(screen.getByTestId("order-summary-total")).toHaveTextContent(
      "$64.98"
    );
    expect(screen.getByTestId("order-summary-checkout")).toBeInTheDocument();
  });

  it("lists all games", () => {
    render(<OrderSummary games={mockGames} />);

    expect(screen.getByTestId("order-summary-item-1")).toHaveTextContent(
      "God of War"
    );
    expect(screen.getByTestId("order-summary-item-2")).toHaveTextContent(
      "Stardew Valley"
    );
  });
});
