// src/context/CartContext.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { CartProvider, useCartContext } from "./CartContext";
import userEvent from "@testing-library/user-event";

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it("initializes from localStorage", () => {
    localStorage.setItem("cart", JSON.stringify(["123"]));

    const TestComponent = () => {
      const { cart } = useCartContext();
      return <div data-testid="cart">{cart.join(",")}</div>;
    };

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId("cart")).toHaveTextContent("123");
  });

  it("adds and removes items correctly", async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const { cart, toggleCart, isInCart } = useCartContext();
      return (
        <div>
          <button data-testid="toggle" onClick={() => toggleCart("abc")}>
            Toggle
          </button>
          <div data-testid="cart">{cart.join(",")}</div>
          <div data-testid="in-cart">{isInCart("abc").toString()}</div>
        </div>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Inicialmente vacío
    expect(screen.getByTestId("cart")).toHaveTextContent("");
    expect(screen.getByTestId("in-cart")).toHaveTextContent("false");

    // Agregar item
    await user.click(screen.getByTestId("toggle"));
    expect(screen.getByTestId("cart")).toHaveTextContent("abc");
    expect(screen.getByTestId("in-cart")).toHaveTextContent("true");

    // Quitar item
    await user.click(screen.getByTestId("toggle"));
    expect(screen.getByTestId("cart")).toHaveTextContent("");
    expect(screen.getByTestId("in-cart")).toHaveTextContent("false");
  });

  it("persists changes to localStorage", async () => {
    const user = userEvent.setup();

    const TestComponent = () => {
      const { toggleCart } = useCartContext();
      return (
        <button onClick={() => toggleCart("xyz")} data-testid="toggle">
          Toggle
        </button>
      );
    };

    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await user.click(screen.getByTestId("toggle"));

    expect(JSON.parse(localStorage.getItem("cart") || "[]")).toContain("xyz");
  });
});
