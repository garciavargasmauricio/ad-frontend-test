import Cart from "@/components/cart/Cart";
import { fetchGames } from "@/services/fetchGames";

// Cart Page
export default async function CartPage() {
  try {
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
