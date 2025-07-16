"use client";

import { fetchGames } from "@/services/fetchGames";
import { Game } from "@/utils/endpoint";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useLazyGameLoader(initialGames: Game[], currentPage: number) {
  const [loadedGames, setLoadedGames] = useState<Game[]>(initialGames);
  const [page, setPage] = useState(currentPage);
  const [loadingMore, setLoadingMore] = useState(false);
  const searchParams = useSearchParams();

  // Fetch more games when page increases
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
