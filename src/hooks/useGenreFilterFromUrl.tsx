"use client";

import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

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
