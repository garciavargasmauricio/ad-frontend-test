import GameCatalog from "@/components/catalog/Catalog";
import { fetchGames } from "@/services/fetchGames";

// Home (Catalog) Page
export default async function Home() {
  try {
    const games = await fetchGames({
      next: { revalidate: 60 },
    });

    return <GameCatalog games={games} />;
  } catch {
    return <p className="text-red-500 p-6">Failed to load catalog.</p>;
  }
}
