"use client";
import Link from "next/link";

export default function BackToCatalog() {
  return (
    <Link
      href="/"
      className="text-sm text-text inline-flex items-center gap-2 mb-4 border-b border-dotted pb-1"
    >
      ← Back to Catalog
    </Link>
  );
}
