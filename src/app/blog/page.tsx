import { Suspense } from "react";
import { PostList } from "../ui/posts";
import { Pagination } from "../ui/pagination";
import { getTotalPosts } from "../lib/data";
import { PostListSkeleton } from "../ui/postsSkeleton";

export default async function Page(
  props: {
    searchParams: Promise<{ page?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page || 1);

  return (
    <div className="flex-grow w-full bg-gray-100 p-4 h-full flex flex-col items-center">
      <Suspense fallback={<PostListSkeleton />}>
        <PostList page={page} />
      </Suspense>
      <Suspense fallback={<div className="h-10"></div>}>
        <PaginationWrapper page={page} />
      </Suspense>
    </div>
  );
}

async function PaginationWrapper({ page }: { page: number }) {
  const totalPosts = await getTotalPosts();

  const totalPages = Math.ceil(totalPosts / 3);

  return <Pagination page={page} totalPages={totalPages} />;
}
