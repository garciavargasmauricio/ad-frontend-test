"use client";

import { fetchGames } from "@/services/fetchGames";
import { Game } from "@/utils/endpoint";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Custom hook to lazily load additional games based on pagination and genre filter.
 *
 * It keeps track of the loaded games, current page, and loading state. When the page number increases,
 * it fetches more games from the API and appends them to the existing list.
 *
 * @param {Game[]} initialGames - The initial set of games loaded on the first request.
 * @param {number} currentPage - The page number of the initial fetch.
 *
 * @returns {{
 *   loadedGames: Game[];      // All currently loaded games (initial + newly fetched).
 *   page: number;             // Current page number in pagination.
 *   setPage: (page: number) => void; // Function to update the current page (triggers a fetch).
 *   loadingMore: boolean;     // Boolean indicating if more games are being fetched.
 * }}
 */
export function useLazyGameLoader(initialGames: Game[], currentPage: number) {
  const [loadedGames, setLoadedGames] = useState<Game[]>(initialGames);
  const [page, setPage] = useState(currentPage);
  const [loadingMore, setLoadingMore] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (page === currentPage) return;

    const fetchMoreGames = async () => {
      setLoadingMore(true);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      const res = await fetchGames({
        genre: params.get("genre") || "",
        page: page,
      });
      setLoadedGames((prev) => [...prev, ...res.games]);
      setLoadingMore(false);
    };

    fetchMoreGames();
  }, [page, currentPage]);

  return { loadedGames, page, setPage, loadingMore };
}
