import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GameCard from "./GameCard";
import { Game } from "@/utils/endpoint";

const mockGame: Game = {
  id: "1",
  name: "Cyberpunk 2077",
  genre: "Action",
  price: 59.99,
  image: "/game-images/cyberpunk2077.jpeg",
  description: "An open-world, action-adventure story set in Night City.",
  isNew: true,
};

describe("GameCard", () => {
  it("renders game info correctly", () => {
    render(
      <GameCard game={mockGame} isInCart={false} onToggleCart={() => {}} />
    );

    expect(screen.getByTestId("game-name")).toHaveTextContent("Cyberpunk 2077");
    expect(screen.getByTestId("game-price")).toHaveTextContent("$59.99");
    expect(screen.getByTestId("game-genre")).toHaveTextContent("Action");
  });

  it("displays 'New' badge if game is new", () => {
    render(
      <GameCard game={mockGame} isInCart={false} onToggleCart={() => {}} />
    );
    expect(screen.getByTestId("game-new-badge")).toBeInTheDocument();
  });

  it("shows 'ADD TO CART' when not in cart", () => {
    render(
      <GameCard game={mockGame} isInCart={false} onToggleCart={() => {}} />
    );
    expect(screen.getByTestId("toggle-cart-button")).toHaveTextContent(
      "ADD TO CART"
    );
  });

  it("shows 'REMOVE' when game is in cart", () => {
    render(
      <GameCard game={mockGame} isInCart={true} onToggleCart={() => {}} />
    );
    expect(screen.getByTestId("toggle-cart-button")).toHaveTextContent(
      "REMOVE"
    );
  });

  it("calls onToggleCart with game id when button is clicked", () => {
    const onToggleCart = jest.fn();
    render(
      <GameCard game={mockGame} isInCart={false} onToggleCart={onToggleCart} />
    );

    const button = screen.getByTestId("toggle-cart-button");
    fireEvent.click(button);

    expect(onToggleCart).toHaveBeenCalledTimes(1);
    expect(onToggleCart).toHaveBeenCalledWith("1");
  });
});
