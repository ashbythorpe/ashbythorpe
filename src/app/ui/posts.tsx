import { getPosts } from "../lib/data";
import { Post } from "../lib/types";

export async function PostList({
  page,
  searchParams,
}: {
  page: number;
  searchParams: URLSearchParams;
}) {
  const posts = await getPosts(page);

  return (
    <div className="flex flex-col items-center">
      {posts.map((post) => (
        <PostCard key={post.name} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <div className="p-2 m-2 bg-gray-300 hover:bg-gray-400 rounded-lg shadow w-11/12 h-36 md:h-36">
      <h1 className="text-3xl font-mono font-semibold text-gray-900">
        {post.title}
      </h1>
      <p className="text-sm text-gray-500">{post.createdAt.toString()}</p>
      <p>{post.description}</p>
    </div>
  );
}
