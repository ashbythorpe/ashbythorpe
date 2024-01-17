"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PostList } from "../ui/posts";
import { Pagination } from "../ui/pagination";
import { getPosts } from "../lib/data";

export default function Page() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || 1);

  return (
    <div className="flex-grow w-full bg-gray-100 p-4 h-full flex flex-col items-center">
      <Suspense fallback={<p>Loading...</p>}>
        <PostList page={page} />
        <Pagination
          page={page}
          pathname={pathname}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
}
