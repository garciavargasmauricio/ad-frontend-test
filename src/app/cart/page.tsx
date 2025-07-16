import Cart from "@/components/cart/Cart";
import { fetchGames } from "@/services/fetchGames";

// This is the Cart Page component rendered at /cart
export default async function CartPage() {
  try {
    // Fetch the games data from the API with empty genre and first page (page 0)
    // The `next.revalidate` option is used for incremental static regeneration (ISR) every 60 seconds
    const res = await fetchGames(
      {
        genre: "",
        page: 0,
      },
      {
        next: { revalidate: 60 },
      }
    );

    return <Cart games={res.games} />;
  } catch {
    return <p className="text-red-500 p-6">Failed to load cart.</p>;
  }
}
