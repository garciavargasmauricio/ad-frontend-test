import { Game } from "@/utils/endpoint";

type GamesResponse = {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
};

type Params = {
  genre?: string;
  page?: number;
};

export async function fetchGames(
  params: Params,
  options?: RequestInit
): Promise<GamesResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(
      `${baseUrl}/games?page=${params.page}&genre=${params.genre}`,
      options
    );
    if (!res.ok) throw new Error("Failed to fetch games");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("fetchGames error:", err);
    throw err;
  }
}
