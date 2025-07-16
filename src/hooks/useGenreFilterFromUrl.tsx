"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Custom hook to extract and manage the selected game genre from the URL query string.
 *
 * It synchronizes the selected genre state with the `genre` query parameter in the URL.
 * If the parameter is not present, it defaults to `"all"`.
 *
 * @returns {{
 *   selectedGenre: string;         // The currently selected genre from the URL
 *   setSelectedGenre: (genre: string) => void; // Function to manually set the selected genre
 * }}
 */
export function useGenreFilterFromUrl() {
  const searchParams = useSearchParams();
  const genreParam = (searchParams.get("genre") || "all").toLowerCase();
  const [selectedGenre, setSelectedGenre] = useState(genreParam);

  useEffect(() => {
    setSelectedGenre(genreParam);
  }, [genreParam]);

  return {
    selectedGenre,
    setSelectedGenre,
  };
}
