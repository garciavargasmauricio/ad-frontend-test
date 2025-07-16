import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { CartProvider } from "@/context/CartContext";
import Cart from "./Cart";
import { Game } from "@/utils/endpoint";

jest.mock("@/components/common/BackToCatalog", () => () => (
  <div data-testid="back-to-catalog">Back</div>
));

const MockCartGameCard = (props: any) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);
  if (!loaded) throw Promise.resolve();
  return (
    <div data-testid={`cart-game-${props.game.id}`}>Game {props.game.name}</div>
  );
};

const MockOrderSummary = (props: any) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);
  if (!loaded) throw Promise.resolve();
  return (
    <div data-testid="cart-summary">Order Summary ({props.games.length})</div>
  );
};

jest.mock("./CartGameCard", () => ({
  __esModule: true,
  default: MockCartGameCard,
}));

jest.mock("./OrderSummary", () => ({
  __esModule: true,
  default: MockOrderSummary,
}));

// Mock games
const mockGames: Game[] = [
  {
    id: "1",
    name: "Game One",
    genre: "Action",
    price: 10,
    image: "/1.jpg",
    description: "desc",
    isNew: true,
  },
  {
    id: "2",
    name: "Game Two",
    genre: "RPG",
    price: 20,
    image: "/2.jpg",
    description: "desc",
    isNew: false,
  },
];

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((msg) => {
    if (
      typeof msg === "string" &&
      msg.includes("A suspended resource finished loading inside a test")
    ) {
      return;
    }
    console.error(msg);
  });
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore?.();
});

describe("Cart", () => {
  beforeEach(() => {
    localStorage.setItem("cart", JSON.stringify(["1", "2"]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("renders fallback while loading", () => {
    render(
      <CartProvider>
        <Cart games={mockGames} />
      </CartProvider>
    );

    // Initial fallback state
    expect(screen.getByTestId("loading-game-1")).toBeInTheDocument();
    expect(screen.getByTestId("loading-game-2")).toBeInTheDocument();
    expect(screen.getByTestId("loading-summary")).toBeInTheDocument();
  });
});
