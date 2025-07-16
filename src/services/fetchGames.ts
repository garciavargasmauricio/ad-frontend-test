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

/**
 * Fetches games from the API with optional genre filter and pagination.
 *
 * This function communicates with the backend API defined by the `NEXT_PUBLIC_API_URL`
 * environment variable and returns the games along with pagination and filter metadata.
 *
 * @param {Params} params - Parameters for filtering and pagination.
 * @param {string} [params.genre] - Optional genre to filter games.
 * @param {number} [params.page=1] - Optional page number for pagination.
 * @param {RequestInit} [options] - Optional fetch options (e.g., headers, cache settings).
 *
 * @returns {Promise<GamesResponse>} A promise that resolves to the response object containing games and metadata.
 *
 * @throws {Error} Throws if the request fails or the response is not OK.
 *
 * @example
 * const { games, totalPages } = await fetchGames({ genre: "action", page: 2 });
 */
export async function fetchGames(
  params: Params,
  options?: RequestInit
): Promise<GamesResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL!;
  const url = `${baseUrl}/games?page=${params.page ?? 1}&genre=${
    params.genre ?? ""
  }`;

  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error("Failed to fetch games");
    return await res.json();
  } catch (err) {
    console.error("fetchGames error:", err);
    throw err;
  }
}
