import GameCatalog from "@/components/catalog/Catalog";
import { fetchGames } from "@/services/fetchGames";

// Home (Catalog) Page
export default async function Home() {
  try {
    const res = await fetchGames({ genre: "" }, { next: { revalidate: 60 } });
    return (
      <GameCatalog
        games={res.games}
        availableFilters={res.availableFilters}
        totalPages={res.totalPages}
        currentPage={res.currentPage}
      />
    );
  } catch {
    return <p className="text-red-500 p-6">Failed to load catalog.</p>;
  }
}
