// src/services/fetchGames.test.tsx
import { fetchGames } from "./fetchGames";

// Mock global fetch
global.fetch = jest.fn();

describe("fetchGames", () => {
  const mockResponse = {
    games: [
      {
        id: "1",
        name: "Test Game",
        genre: "Action",
        price: 10,
        image: "/test.jpg",
        description: "desc",
        isNew: false,
      },
    ],
    availableFilters: ["Action", "RPG"],
    totalPages: 1,
    currentPage: 1,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches games successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await fetchGames({ genre: "action", page: 1 });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/games?page=1&genre=action"),
      undefined
    );
    expect(result).toEqual(mockResponse);
  });

  it("throws an error on non-OK response", async () => {
    // Silence expected error logs for cleaner test output
    jest.spyOn(console, "error").mockImplementation(() => {});
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(fetchGames({ genre: "action", page: 1 })).rejects.toThrow(
      "Failed to fetch games"
    );
  });

  it("throws an error on network failure", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchGames({ genre: "rpg", page: 2 })).rejects.toThrow(
      "Network error"
    );
  });
});
