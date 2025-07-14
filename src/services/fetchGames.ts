import { Game } from "@/utils/endpoint";

export async function fetchGames(options?: RequestInit): Promise<Game[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const res = await fetch(`${baseUrl}/games`, options);
    if (!res.ok) throw new Error("Failed to fetch games");
    const data: { games: Game[] } = await res.json();
    return data.games;
  } catch (err) {
    console.error("fetchGames error:", err);
    throw err;
  }
}
