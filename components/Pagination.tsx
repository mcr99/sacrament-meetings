"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
  totalPages: number;
};

export default function Pagination({
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage =
    Number(searchParams.get("page")) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  }

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-4"
    >
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-secondary"
        >
          Previous
        </Link>
      )}

      <span className="text-sm font-medium text-slate-700">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-secondary"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
