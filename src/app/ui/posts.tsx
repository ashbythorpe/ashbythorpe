import { clsx } from "clsx";
import { getPosts } from "../lib/data";
import { Post } from "../lib/types";
import Link from "next/link";

export async function PostList({ page }: { page: number }) {
  const posts = await getPosts(page);

  return (
    <div
      className={clsx(
        "flex flex-col sm:max-sm:h-1/3 w-full md:flex-grow md:items-stretch md:grid",
        {
          "md:grid-cols-1 md:w-1/3": posts.length === 1,
          "md:grid-cols-2 md:w-2/3": posts.length === 2,
          "md:grid-cols-3": posts.length >= 3,
        },
      )}
    >
      {posts.map((post) => (
        <PostCard key={post.name} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
  const url = `/blog/${post.name}`;
  return (
    <Link
      href={url}
      className="p-2 h-32 md:h-full m-2 w-11/12 flex flex-col self-auto"
    >
      <h1 className="text-3xl underline font-semibold text-gray-900 pb-2">
        {post.title}
      </h1>
      <p>{post.description}</p>
      <p className="text-sm text-gray-500 float-end mt-auto self-end">
        {post.createdAt.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
    </Link>
  );
}
