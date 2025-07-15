import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

// Mock del ícono si no está disponible como componente puro
jest.mock("../icons/CartIcon", () => (props: any) => (
  <svg data-testid={props["data-testid"]} {...props} />
));

describe("Header", () => {
  it("renders header with title and cart icon", () => {
    render(<Header />);

    // Header container
    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute("role", "banner");

    // Title
    const title = screen.getByTestId("header-title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("GamerShop");
    expect(title).toHaveAttribute("role", "heading");

    // Link to home
    const homeLink = screen.getByRole("link", { name: /go to home page/i });
    expect(homeLink).toHaveAttribute("href", "/");

    // Cart icon
    const cartIcon = screen.getByTestId("cart-icon");
    expect(cartIcon).toBeInTheDocument();

    // Link to cart
    const cartLink = screen.getByRole("link", { name: /view cart/i });
    expect(cartLink).toHaveAttribute("href", "/cart");
  });
});
