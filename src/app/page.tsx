import GameCatalog from "@/components/catalog/Catalog";
import { fetchGames } from "@/services/fetchGames";

/**
 * Home page component (route: `/`).
 *
 * - Fetches the initial list of games from the backend.
 * - Displays the game catalog using the `GameCatalog` component.
 * - Implements ISR (Incremental Static Regeneration) with a 60-second revalidation window.
 *
 * @returns {JSX.Element} Rendered catalog page or fallback error message.
 */
export default async function Home() {
  try {
    /**
     * Calls the backend to retrieve game data.
     *
     * @param genre Genre filter for the catalog (empty string means "all").
     * @param revalidate Tells Next.js to revalidate the page every 60 seconds.
     */
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
    /**
     * Displays a fallback message if the data fetch fails.
     */
    return <p className="text-red-500 p-6">Failed to load catalog.</p>;
  }
}
