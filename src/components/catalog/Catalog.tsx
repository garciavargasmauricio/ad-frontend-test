"use client";

import React from "react"; // For testging purposes
import GameCard from "@/components/catalog/GameCard";
import { Game } from "@/utils/endpoint";
import { useCartContext } from "@/context/CartContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useGenreFilterFromUrl } from "@/hooks/useGenreFilterFromUrl";
import { useLazyGameLoader } from "@/hooks/useLazyGameLoader";

/**
 * Props for the GameCatalog component.
 *
 * @typedef {Object} CatalogProps
 * @property {Game[]} games - Initial list of games loaded from the server.
 * @property {string[]} availableFilters - List of available genres to filter by.
 * @property {number} totalPages - Total number of pages available for pagination.
 * @property {number} currentPage - The current page number of the game list.
 */
type CatalogProps = {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
};

/**
 * `GameCatalog` component.
 *
 * Displays a list of games with filtering by genre and lazy loading pagination.
 * Integrates with cart context to toggle games in the cart.
 *
 * @component
 * @param {CatalogProps} props - The props for the component.
 * @returns {JSX.Element} Rendered catalog UI with filters and game cards.
 */
export default function GameCatalog({
  games,
  availableFilters,
  totalPages,
  currentPage,
}: CatalogProps) {
  const { toggleCart, isInCart } = useCartContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { selectedGenre } = useGenreFilterFromUrl();
  const { loadedGames, page, setPage, loadingMore } = useLazyGameLoader(
    games,
    currentPage
  );

  // Filter games by selected genre
  const filteredGames =
    selectedGenre === "all"
      ? loadedGames
      : loadedGames.filter(
          (g) => g.genre.toLowerCase() === selectedGenre.toLowerCase()
        );

  /**
   * Updates URL query params when genre is changed.
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event from genre select.
   */
  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGenre = event.target.value;
    const params = new URLSearchParams(searchParams.toString());

    // Reset to page 1 when filter changes
    params.set("page", "1");

    if (newGenre === "all") {
      params.delete("genre");
    } else {
      params.set("genre", newGenre);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="px-4">
      <section
        className="max-w-[1200px] mx-auto px-4 py-6 border-b border-border-light"
        aria-labelledby="top-sellers-heading"
      >
        <div className="max-w-[1200px] mx-auto">
          <h1
            id="top-sellers-heading"
            className="text-[36px] leading-[40px] font-bold mb-4 text-text"
            data-testid="catalog-heading"
          >
            Top Sellers
          </h1>
        </div>

        <fieldset
          className="mb-6 flex sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-4"
          aria-label="Filter games by genre"
        >
          <legend className="sr-only">Genre Filter</legend>

          <label htmlFor="genre" className="text-[20px] font-bold text-text">
            Genre
          </label>

          <span className="text-[20px] font-light text-text">|</span>

          <select
            data-testid="genre-select"
            id="genre"
            name="genre"
            value={selectedGenre}
            className="custom-select text-text focus:outline-none font-archivo text-[20px] w-full sm:w-[270px]"
            aria-label="Select game genre"
            onChange={handleGenreChange}
          >
            <option value="all">All</option>
            {availableFilters?.map((genre) => (
              <option key={genre} value={genre.toLowerCase()}>
                {genre}
              </option>
            ))}
          </select>
        </fieldset>
      </section>

      <div
        data-testid="game-list"
        className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6 justify-items-center"
      >
        {filteredGames.length ? (
          filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isInCart={isInCart(game.id)}
              onToggleCart={() => toggleCart(game.id)}
            />
          ))
        ) : (
          <div>There are no games available in this genre.</div>
        )}
      </div>

      {page < totalPages && (
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <button
            aria-label="Load more games in catalog"
            className="px-6 py-2 bg-button text-white rounded hover:bg-button-600 transition-colors disabled:opacity-50"
            onClick={() => setPage(page + 1)}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "See more"}
          </button>
        </div>
      )}
    </div>
  );
}
