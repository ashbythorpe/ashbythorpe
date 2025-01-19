import BlogPost from "@/app/ui/blogpost";
import Post from "./post.mdx";

export default async function Page(props: {
  params: Promise<{ page?: string }>;
}) {
  const params = await props.params;
  return (
    <BlogPost name="$POST_TITLE" params={params}>
      <Post />
    </BlogPost>
  );
}
