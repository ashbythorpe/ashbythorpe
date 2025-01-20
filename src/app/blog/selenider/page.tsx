import BlogPost from "@/app/ui/blogpost";
import Post from "./post.mdx";

export default async function Page({
  params,
}: {
  params: Promise<{ page?: string }>;
}) {
  const { page } = await params;
  return (
    <BlogPost name="selenider" page={page}>
      <Post />
    </BlogPost>
  );
}
