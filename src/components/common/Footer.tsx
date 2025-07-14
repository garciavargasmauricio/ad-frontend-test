import LogoIcon from "../icons/Logo";

export default function Footer() {
  return (
    <footer
      role="banner"
      className="bg-secondary mt-10 p-6 border-t text-center text-sm text-gray-600"
    >
      <a
        href="/"
        className="inline-flex flex-col items-center gap-1"
        aria-label="Go to home page"
      >
        <LogoIcon aria-hidden="true" focusable="false" />
      </a>
    </footer>
  );
}
