import { Post } from "../lib/types";
import Link from "next/link";

export async function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col items-center">
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
      className="p-2 m-2 bg-gray-300 hover:bg-gray-400 rounded-lg shadow w-11/12 h-36 md:h-36"
    >
      <h1 className="text-3xl font-mono font-semibold text-gray-900">
        {post.title}
      </h1>
      <p className="text-sm text-gray-500">{post.createdAt.toString()}</p>
      <p>{post.description}</p>
    </Link>
  );
}
