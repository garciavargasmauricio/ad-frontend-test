import React from "react"; // For testing purposes
import CartIcon from "../icons/CartIcon";

/**
 * `Header` component.
 *
 * Renders the top-level navigation header for the application.
 * Includes a link to the homepage with the app title and a link to the cart with a cart icon.
 * Uses semantic HTML and accessibility attributes.
 *
 * @component
 * @returns {JSX.Element} The rendered header element.
 */
export default function Header() {
  return (
    <header
      className="bg-primary flex justify-between items-center px-24 py-4 border-b font-archivo"
      role="banner"
      data-testid="header"
    >
      <a href="/" className="text-lg" aria-label="Go to home page">
        <span
          data-testid="header-title"
          className="text-[24px] leading-[24px] font-bold text-lg"
          role="heading"
          aria-level={1}
        >
          GamerShop
        </span>
      </a>

      <a href="/cart" className="text-lg" aria-label="View cart">
        <CartIcon
          data-testid="cart-icon"
          className="w-6 h-6 text-gray-600 hover:text-blue-600"
          aria-hidden="true"
          focusable="false"
        />
      </a>
    </header>
  );
}
