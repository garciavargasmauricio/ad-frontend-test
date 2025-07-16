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

const isServer = typeof window === "undefined";

const baseUrl = isServer ? process.env.NEXT_PUBLIC_API_URL! : "/api";

export async function fetchGames(
  params: Params,
  options?: RequestInit
): Promise<GamesResponse> {
  if (isServer && !process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL in environment");
  }

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
