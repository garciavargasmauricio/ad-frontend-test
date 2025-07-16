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

const baseUrl = isServer
  ? process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api`
    : process.env.NEXT_PUBLIC_API_URL // fallback local dev
  : process.env.NEXT_PUBLIC_API_URL; // always used on client

export async function fetchGames(
  params: Params,
  options?: RequestInit
): Promise<GamesResponse> {
  try {
    const url = `${baseUrl}/games?page=${params.page ?? 1}&genre=${
      params.genre ?? ""
    }`;
    const res = await fetch(url, options);

    if (!res.ok) throw new Error("Failed to fetch games");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("fetchGames error:", err);
    throw err;
  }
}
