// src/hooks/useGenreFilterFromUrl.test.tsx
import { renderHook } from "@testing-library/react";
import { useGenreFilterFromUrl } from "./useGenreFilterFromUrl";

// Mock de next/navigation
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

import { useSearchParams } from "next/navigation";

describe("useGenreFilterFromUrl", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns 'all' by default when no genre param", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    const { result } = renderHook(() => useGenreFilterFromUrl());

    expect(result.current.selectedGenre).toBe("all");
  });

  it("returns the genre from the URL", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => "Action",
    });

    const { result } = renderHook(() => useGenreFilterFromUrl());

    expect(result.current.selectedGenre).toBe("action"); // Should be lowercased
  });

  it("updates selectedGenre when genre param changes", () => {
    let currentValue = "RPG";
    (useSearchParams as jest.Mock).mockImplementation(() => ({
      get: () => currentValue,
    }));

    const { result, rerender } = renderHook(() => useGenreFilterFromUrl());

    expect(result.current.selectedGenre).toBe("rpg");

    // Simula cambio de parámetro
    currentValue = "Simulation";
    rerender();

    expect(result.current.selectedGenre).toBe("simulation");
  });
});
