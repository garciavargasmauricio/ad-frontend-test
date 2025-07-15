import React from "react"; // For testing purposes
import LogoIcon from "../icons/Logo";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      role="banner"
      className="bg-secondary mt-10 p-6 border-t text-center text-sm text-gray-600"
    >
      <a
        data-testid="footer-logo"
        href="/"
        className="inline-flex flex-col items-center gap-1"
        aria-label="Go to home page"
      >
        <LogoIcon aria-hidden="true" focusable="false" />
      </a>
    </footer>
  );
}
