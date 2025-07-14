import Cart from "@/components/cart/Cart";
import { fetchGames } from "@/services/fetchGames";

// Cart Page
export default async function CartPage() {
  try {
    const games = await fetchGames({
      cache: "no-store",
    });

    return <Cart games={games} />;
  } catch {
    return <p className="text-red-500 p-6">Failed to load cart.</p>;
  }
}
