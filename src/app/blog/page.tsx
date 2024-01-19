import { Suspense } from "react";
import { PostList } from "../ui/posts";
import { Pagination } from "../ui/pagination";
import { getPosts, getTotalPosts } from "../lib/data";

export default function Page({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page || 1);

  return (
    <div className="flex-grow w-full bg-gray-100 p-4 h-full flex flex-col items-center">
      <Suspense fallback={<p>Loading...</p>}>
        <PostListWrapper page={page} />
        <PaginationWrapper page={page} />
      </Suspense>
    </div>
  );
}

async function PostListWrapper({ page }: { page: number }) {
  const posts = await getPosts(page);

  return <PostList posts={posts} />;
}

async function PaginationWrapper({ page }: { page: number }) {
  const totalPosts = await getTotalPosts();

  const totalPages = Math.ceil(totalPosts / 3);

  return <Pagination page={page} totalPages={totalPages} />;
}
