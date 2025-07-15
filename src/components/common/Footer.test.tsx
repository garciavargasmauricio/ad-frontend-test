import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

// Mock del LogoIcon
jest.mock("../icons/Logo", () => ({
  __esModule: true,
  default: (props: any) => <svg data-testid="mock-logo-icon" {...props} />,
}));

describe("Footer", () => {
  it("renders the footer element with correct role and testid", () => {
    render(<Footer />);

    const footer = screen.getByTestId("footer");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveAttribute("role", "banner");
  });

  it("renders the footer logo link", () => {
    render(<Footer />);

    const logoLink = screen.getByTestId("footer-logo");
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute("href", "/");
    expect(logoLink).toHaveAttribute("aria-label", "Go to home page");
  });

  it("renders the mocked LogoIcon inside the footer", () => {
    render(<Footer />);

    const logoIcon = screen.getByTestId("mock-logo-icon");
    expect(logoIcon).toBeInTheDocument();
  });
});
