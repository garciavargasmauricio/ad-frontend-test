import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartGameCard from "./CartGameCard";
import { Game } from "@/utils/endpoint";

const mockGame: Game = {
  id: "1",
  name: "Elden Ring",
  genre: "RPG",
  price: 59.99,
  image: "/eldenring.jpg",
  description: "An epic open-world RPG adventure.",
  isNew: true,
};

describe("CartGameCard", () => {
  it("renders game information correctly", () => {
    render(<CartGameCard game={mockGame} onRemove={() => {}} />);

    expect(screen.getByTestId("cart-item-image")).toBeInTheDocument();
    expect(screen.getByTestId("cart-item-genre")).toHaveTextContent("RPG");
    expect(screen.getByTestId("cart-item-name")).toHaveTextContent(
      "Elden Ring"
    );
    expect(screen.getByTestId("cart-item-description")).toHaveTextContent(
      "An epic open-world RPG adventure."
    );
    expect(screen.getByTestId("cart-item-price")).toHaveTextContent("$59.99");
  });

  it("calls onRemove with game when remove button is clicked", () => {
    const handleRemove = jest.fn();
    render(<CartGameCard game={mockGame} onRemove={handleRemove} />);

    const removeButton = screen.getByTestId("cart-item-remove");
    fireEvent.click(removeButton);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith(mockGame);
  });
});
