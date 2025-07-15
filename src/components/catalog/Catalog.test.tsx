import React from "react";
import { render, screen } from "@testing-library/react";
import { CartProvider } from "@/context/CartContext";
import { Game } from "@/utils/endpoint";
import GameCatalog from "./Catalog";

const mockGames: Game[] = [
  {
    id: "1",
    name: "Cyberpunk 2077",
    genre: "Action",
    price: 59.99,
    image: "/game-images/cyberpunk2077.jpeg",
    description: "Open world RPG",
    isNew: true,
  },
];

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "genre") return "all";
      if (key === "page") return "1";
      return null;
    },
    toString: () => "genre=all&page=1",
  }),
}));

jest.mock("@/hooks/useGenreFilterFromUrl", () => ({
  useGenreFilterFromUrl: () => ({
    selectedGenre: "all",
  }),
}));

jest.mock("@/hooks/useLazyGameLoader", () => ({
  useLazyGameLoader: () => ({
    loadedGames: [],
    page: 1,
    setPage: jest.fn(),
    loadingMore: false,
  }),
}));

describe("GameCatalog", () => {
  it("renders catalog heading and genre select", () => {
    render(
      <CartProvider>
        <GameCatalog
          games={mockGames}
          availableFilters={["Action", "RPG"]}
          currentPage={1}
          totalPages={1}
        />
      </CartProvider>
    );

    expect(screen.getByTestId("catalog-heading")).toHaveTextContent(
      /Top Sellers/i
    );
    expect(screen.getByTestId("genre-select")).toBeInTheDocument();
    expect(screen.getByTestId("game-list")).toBeInTheDocument();
  });

  it("renders fallback when no games are found", () => {
    render(
      <CartProvider>
        <GameCatalog
          games={[]}
          availableFilters={["RPG"]}
          currentPage={1}
          totalPages={1}
        />
      </CartProvider>
    );

    expect(
      screen.getByText("There are no games available in this genre.")
    ).toBeInTheDocument();
  });
});
