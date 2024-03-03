"use client";

import clsx from "clsx";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="flex justify-center mt-4">
        {PaginationArrow("left", page, totalPages, createPageURL)}
        {generatePageButtons(page, totalPages, createPageURL)}
        {PaginationArrow("right", page, totalPages, createPageURL)}
      </div>
    </>
  );
}

function PaginationArrow(
  direction: "left" | "right",
  current: number,
  total: number,
  createPageURL: (pageNumber: number) => string,
) {
  const Icon = direction === "left" ? ArrowLeftIcon : ArrowRightIcon;

  const disabled =
    (current === 1 && direction === "left") ||
    (current >= total && direction === "right");

  if (disabled) {
    return (
      <div className="h-10 w-10 rounded text-gray-500 flex justify-center items-center">
        <Icon className="w-4" />
      </div>
    );
  } else {
    const url = createPageURL(direction === "left" ? current - 1 : current + 1);
    return (
      <Link
        href={url}
        className="h-10 w-10 rounded hover:bg-gray-400 flex justify-center items-center"
      >
        <Icon className="w-4" />
      </Link>
    );
  }
}

function generatePageButtons(
  current: number,
  total: number,
  createPageURL: (pageNumber: number) => string,
) {
  const pageNumbers = getPageNumbers(current, total);

  return pageNumbers.map((page, index) =>
    pageButton(index, page, current, createPageURL),
  );
}

function getPageNumbers(current: number, total: number) {
  if (total <= 7) {
    return [1, 2, 3, 4, 5, 6, 7].slice(0, total);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, "...", total - 1, total];
  }

  if (current >= total - 2) {
    return [1, 2, "...", total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
}

function pageButton(
  key: number,
  page: string | number,
  current: number,
  createPageURL: (pageNumber: number) => string,
) {
  if (page === "...") {
    return (
      <div
        key={key}
        className="w-10 h-10 rounded border-2 border-white border-hidden flex justify-center items-center"
      >
        ...
      </div>
    );
  }

  if (typeof page === "string") {
    console.error("Invalid page: ", page);
    return null;
  }

  const active = page === current;

  const className = clsx(
    "w-10 h-10 rounded border-2 border-white border-hidden flex justify-center items-center",
    {
      "bg-indigo-500 text-gray-50 border-solid": active,
      "hover:bg-gray-400 hover:text-gray-50": !active,
    },
  );

  const url = createPageURL(page);

  if (active) {
    return (
      <div key={key} className={className}>
        {page}
      </div>
    );
  } else {
    return (
      <Link key={key} href={url} className={className}>
        {page}
      </Link>
    );
  }
}
