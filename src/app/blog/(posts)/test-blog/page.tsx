import BlogPost from "@/app/ui/blogpost";
import Post from "./post.mdx";

export default function Page({ params }: { params: { page?: string } }) {
  return (
    <BlogPost name="test-blog" params={params}>
      <Post />
    </BlogPost>
  );
}
