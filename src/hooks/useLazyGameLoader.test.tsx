// src/hooks/useLazyGameLoader.test.tsx
import { renderHook, act } from "@testing-library/react";
import { useLazyGameLoader } from "./useLazyGameLoader";
import { Game } from "@/utils/endpoint";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("@/services/fetchGames", () => ({
  fetchGames: jest.fn(),
}));

import { useSearchParams } from "next/navigation";
import { fetchGames } from "@/services/fetchGames";

const mockGames: Game[] = [
  {
    id: "1",
    name: "Mock Game",
    genre: "Action",
    price: 10,
    image: "image.jpg",
    description: "desc",
    isNew: true,
  },
];

describe("useLazyGameLoader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams(""));
  });

  it("initializes with given games and page", () => {
    const { result } = renderHook(() => useLazyGameLoader(mockGames, 1));

    expect(result.current.loadedGames).toEqual(mockGames);
    expect(result.current.page).toBe(1);
    expect(result.current.loadingMore).toBe(false);
  });

  it("loads more games when page increases", async () => {
    const moreGames: Game[] = [
      { ...mockGames[0], id: "2", name: "Second Game" },
    ];

    (fetchGames as jest.Mock).mockResolvedValue({ games: moreGames });

    const { result } = renderHook(() => useLazyGameLoader(mockGames, 1));

    await act(async () => {
      result.current.setPage(2);
    });

    expect(fetchGames).toHaveBeenCalledWith({ genre: "", page: 2 });
    expect(result.current.loadedGames).toEqual([...mockGames, ...moreGames]);
    expect(result.current.loadingMore).toBe(false);
  });

  it("does not fetch when page is unchanged", async () => {
    const { result } = renderHook(() => useLazyGameLoader(mockGames, 1));

    await act(async () => {
      result.current.setPage(1); // no-op
    });

    expect(fetchGames).not.toHaveBeenCalled();
  });
});
